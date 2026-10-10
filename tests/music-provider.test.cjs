const { test } = require('node:test');
const assert = require('node:assert/strict');
const React = require('react');
const { act } = React;
const { createRoot } = require('react-dom/client');
const { JSDOM } = require('jsdom');
const { MusicProvider, useMusic } = require('../components/MusicProvider.tsx');

async function setup({ readyAPI = true, delayedController = false, sharedTrack = false } = {}) {
  const dom = new JSDOM('<div id="root"></div>', { url:'http://localhost/' });
  global.window = dom.window;
  global.document = dom.window.document;
  global.IS_REACT_ACT_ENVIRONMENT = true;
  const data = ['3MJORK5D5v7d5cSG1Cte6a', '3G8AYHiczaJoHhcVjzh9TR'].map((id, p) => ({
    id, title:`Playlist ${p}`, url:`https://open.spotify.com/playlist/${id}`, thumbnail_url:'',
    tracks:[0,1,2].map(t => ({ uri:`spotify:track:${p}-${t}`, title:`Track ${p}-${t}`, artist:'Artist', duration_ms:30000 })),
  }));
  if (sharedTrack) data[1].tracks[1] = data[0].tracks[1];
  global.fetch = async url => ({ ok:true, json:async () => url === '/api/spotify-playlists' ? { playlists:data } : { thumbnail_url:'' } });
  const controllers = [];
  const completions = [];
  const api = { createController(mount, options, callback) {
    const host = mount.parentElement;
    assert.equal(host.id, 'portfolio-spotify-controller', 'Spotify must replace a child, not the permanent host');
    const iframe = document.createElement('iframe');
    iframe.setAttribute('loading', 'lazy');
    iframe.setAttribute('width', String(options.width));
    iframe.setAttribute('height', String(options.height));
    host.replaceChild(iframe, mount);
    const listeners = new Map();
    const controller = {
      iframe, calls:[], destroyed:false,
      loadEntity(uri) { this.calls.push(['load', uri]); },
      play() { this.calls.push(['play']); },
      togglePlay() { this.calls.push(['toggle']); },
      addListener(name, handler) {
        assert.equal(listeners.has(name), false, 'No duplicate listener registrations');
        listeners.set(name, handler);
      },
      emit(name, data) { listeners.get(name)?.({ data }); },
      destroy() { this.destroyed = true; iframe.remove(); listeners.clear(); },
    };
    controllers.push(controller);
    if (delayedController) completions.push(() => callback(controller));
    else callback(controller);
  } };
  if (readyAPI) window.__portfolioSpotifyAPI = api;
  const values = [];
  function Consumer({ index }) { values[index] = useMusic(); return React.createElement('output', null, values[index].isPaused ? 'paused' : 'playing'); }
  const root = createRoot(document.getElementById('root'));
  const render = page => React.createElement(React.StrictMode, null, React.createElement(MusicProvider, null,
    React.createElement(Consumer, { index:0 }), React.createElement(Consumer, { index:1 }), React.createElement('main', { key:page }, page)));
  await act(async () => { root.render(render('music')); });
  return {
    controllers, completions, api, get music() { return values[0]; }, get globalMusic() { return values[1]; },
    async action(fn) { await act(async () => { fn(); }); },
    async navigate(page) { await act(async () => { root.render(render(page)); }); },
    async cleanup() { await act(async () => { root.unmount(); }); dom.window.close(); },
  };
}

test('SDK replacement stays inside one eager iframe host through StrictMode and navigation', async () => {
  const h = await setup();
  try {
    assert.equal(h.controllers.length, 1);
    const c = h.controllers[0];
    assert.equal(c.iframe.loading, 'eager');
    assert.equal(c.iframe.getAttribute('tabindex'), '-1');
    assert.equal(c.iframe.getAttribute('aria-hidden'), 'true');
    assert.equal(document.querySelectorAll('#portfolio-spotify-controller iframe').length, 1);
    await h.navigate('about'); await h.navigate('books'); await h.navigate('music');
    assert.equal(h.controllers.length, 1);
    assert.equal(document.querySelector('iframe'), c.iframe);
  } finally { await h.cleanup(); }
  assert.equal(h.controllers[0].destroyed, true);
});

test('early requests wait for ready; only Spotify events can claim playing', async () => {
  const h = await setup();
  try {
    const c = h.controllers[0];
    await h.action(() => { h.music.playTrack(0,0); h.music.playTrack(0,2); });
    assert.equal(c.calls.length, 0);
    assert.equal(h.music.isPaused, true);
    await h.action(() => c.emit('ready', {}));
    assert.deepEqual(c.calls, [['load','spotify:track:0-2'], ['play']]);
    assert.equal(h.music.isPaused, true, 'Blocked/autoplay-denied play must remain paused');
    await h.action(() => c.emit('playback_update', { playingURI:'spotify:track:0-2', isPaused:false, isBuffering:true, position:0, duration:30000 }));
    assert.equal(h.music.isBuffering, true);
    await h.action(() => c.emit('playback_started', { playingURI:'spotify:track:0-2' }));
    assert.equal(h.music.isPaused, false);
    assert.equal(h.music.isBuffering, false);
    assert.equal(h.globalMusic, h.music);
    await h.action(() => h.globalMusic.toggle());
    assert.equal(h.music.isPaused, false, 'Pause also waits for an actual event');
    assert.deepEqual(c.calls.at(-1), ['toggle']);
    await h.action(() => c.emit('playback_update', { isPaused:true, position:5000, duration:30000 }));
    assert.equal(h.music.isPaused, true);
    assert.equal(h.music.position, 5000);
    await h.action(() => c.emit('playback_update', { position:5100 }));
    assert.equal(h.music.isPaused, true, 'Partial events cannot manufacture a playing state');
  } finally { await h.cleanup(); }
});

test('playlist browsing preserves real progress; track selection, previous and next share playback', async () => {
  const h = await setup();
  try {
    const c = h.controllers[0];
    await h.action(() => c.emit('ready', {}));
    await h.action(() => h.music.playTrack(0,1));
    await h.action(() => c.emit('playback_update', { playingURI:'spotify:track:0-1', isPaused:false, position:8000, duration:30000 }));
    await h.action(() => h.music.setSelectedIndex(1));
    assert.equal(h.music.position,8000);
    assert.equal(h.music.currentTrack.uri,'spotify:track:0-1');
    await h.action(() => h.music.playTrack(1,0));
    await h.action(() => c.emit('playback_started',{playingURI:'spotify:track:1-0'}));
    await h.action(() => h.globalMusic.previous());
    assert.deepEqual(c.calls.at(-2),['load','spotify:track:1-2']);
    await h.action(() => h.music.next());
    assert.deepEqual(c.calls.at(-2),['load','spotify:track:1-0']);
    await h.navigate('about');
    assert.equal(h.music.isPaused,false);
    assert.equal(h.controllers.length,1);
  } finally { await h.cleanup(); }
});

test('repeated requests during delayed SDK initialization create only one controller', async () => {
  const h = await setup({readyAPI:false,delayedController:true});
  try {
    assert.equal(document.querySelectorAll('script[data-portfolio-spotify-api]').length,1);
    await h.action(() => { h.music.toggle(); h.music.playTrack(0,1); });
    await h.action(() => window.onSpotifyIframeApiReady(h.api));
    assert.equal(h.controllers.length,1);
    await h.action(() => { h.music.toggle(); h.music.playTrack(0,2); });
    assert.equal(h.controllers.length,1);
    await h.action(() => h.completions[0]());
    await h.action(() => h.controllers[0].emit('ready',{}));
    assert.deepEqual(h.controllers[0].calls,[['load','spotify:track:0-2'],['play']]);
  } finally { await h.cleanup(); }
});

test('late callbacks after unmount cannot leave an iframe or resurrect playback', async () => {
  const h = await setup({delayedController:true});
  await h.cleanup();
  h.completions[0]();
  assert.equal(h.controllers[0].destroyed,true);
  assert.equal(h.controllers[0].calls.length,0);
});


test('a track shared by two playlists keeps next/previous in the requested playlist', async () => {
  const h = await setup({sharedTrack:true});
  try {
    const c = h.controllers[0];
    await h.action(() => c.emit('ready', {}));
    await h.action(() => h.music.playTrack(1,1));
    await h.action(() => c.emit('playback_started', {playingURI:'spotify:track:0-1'}));
    assert.equal(h.music.currentPlaylist.id, '3G8AYHiczaJoHhcVjzh9TR');
    await h.action(() => h.music.next());
    assert.deepEqual(c.calls.at(-2), ['load','spotify:track:1-2']);
  } finally { await h.cleanup(); }
});

test('first tap plays the prepared track without navigating the iframe', async () => {
  const h = await setup();
  try {
    const c = h.controllers[0];
    await h.action(() => c.emit('ready', {}));
    assert.deepEqual(c.calls, [['load','spotify:track:0-0']]);
    assert.equal(h.music.isPaused, true, 'Preparation must never autoplay');
    c.calls.length = 0;
    await h.action(() => h.music.toggle());
    assert.deepEqual(c.calls, [['play']], 'First gesture must not reload the entity');
    assert.equal(h.music.isPaused, true, 'Still wait for Spotify confirmation');
  } finally { await h.cleanup(); }
});
