const {test} = require('node:test');
const assert = require('node:assert/strict');
const React = require('react');
const {act} = React;
const {createRoot} = require('react-dom/client');
const {JSDOM} = require('jsdom');
const LibraryWorld = require('../components/LibraryWorld.tsx').default;
const TravelGallery = require('../components/TravelGallery.tsx').default;
const ArtV11 = require('../components/ArtV11.tsx').default;
const SelectedWorkExplorer = require('../components/SelectedWorkExplorer.tsx').default;

async function mount(Component, props = {}) {
  const dom = new JSDOM('<div id="root"></div>', {url:'http://localhost/',pretendToBeVisual:true});
  global.window = dom.window; global.document = dom.window.document; global.self = dom.window;
  global.IntersectionObserver = class {observe(){} unobserve(){} disconnect(){}};
  global.HTMLElement = dom.window.HTMLElement;
  global.IS_REACT_ACT_ENVIRONMENT = true;
  window.matchMedia = () => ({matches:true,addEventListener(){},removeEventListener(){}});
  const scrolls = [];
  window.HTMLElement.prototype.scrollIntoView = function(options) {scrolls.push(options);};
  window.HTMLDialogElement.prototype.showModal = function() {this.setAttribute('open','');};
  window.HTMLDialogElement.prototype.close = function() {this.removeAttribute('open');};
  const root = createRoot(document.getElementById('root'));
  await act(async()=>root.render(React.createElement(Component,props)));
  return {
    scrolls,
    async click(selector) {await act(async()=>document.querySelector(selector).click());},
    async swipe(selector,dx,dy=0) {
      await act(async()=>{
        const el=document.querySelector(selector);
        for (const [type,x,y] of [['touchstart',200,100],['touchend',200+dx,100+dy]]) {
          const event=new window.Event(type,{bubbles:true});
          Object.defineProperty(event,type==='touchstart'?'touches':'changedTouches',{value:[{clientX:x,clientY:y}]});
          el.dispatchEvent(event);
        }
      });
    },
    async cleanup(){await act(async()=>root.unmount());dom.window.close();}
  };
}

test('opened book swipes change cover, title and purchase destination; vertical scrolling does not',async()=>{
  const h=await mount(LibraryWorld,{driveBooks:[{name:'1.png',image:'/one.png'},{name:'2.png',image:'/two.png'}]});
  try {
    await h.click('[aria-label="Open The Alchemist"]');
    await h.swipe('.book-dialog-swipe-content',-100);
    assert.equal(document.querySelector('dialog').getAttribute('aria-label'),'The Four Agreements');
    assert.equal(document.querySelector('.book-dialog-swipe img').getAttribute('src'),'/two.png');
    assert.equal(document.querySelector('dialog a').getAttribute('href'),'https://amzn.to/4s24lmx');
    await h.swipe('.book-dialog-swipe-content',-20,160);
    assert.equal(document.querySelector('dialog').getAttribute('aria-label'),'The Four Agreements');
    await h.swipe('.book-dialog-swipe-content',100);
    assert.equal(document.querySelector('dialog').getAttribute('aria-label'),'The Alchemist');
  } finally {await h.cleanup();}
});

test('travel viewer supports swipes in both directions and leaves vertical gestures alone',async()=>{
  const h=await mount(TravelGallery,{photographs:[{place:'France',image:'/one.png'},{place:'Italy',image:'/two.png'}]});
  try {
    await h.click('[aria-label="Open photo from France"]');
    await h.swipe('.art-lightbox-stage',-100);
    assert.equal(document.querySelector('dialog').getAttribute('aria-label'),'Italy');
    await h.swipe('.art-lightbox-stage',20,150);
    assert.equal(document.querySelector('dialog').getAttribute('aria-label'),'Italy');
    await h.swipe('.art-lightbox-stage',100);
    assert.equal(document.querySelector('dialog').getAttribute('aria-label'),'France');
  } finally {await h.cleanup();}
});

test('art viewer swipes update image and caption together',async()=>{
  const h=await mount(ArtV11);
  try {
    await h.click('.gallery button');
    await h.swipe('.viewer-body',-100);
    assert.equal(document.querySelector('.viewer-body img').getAttribute('src'),'/art-v11/work-2.webp');
    assert.equal(document.querySelector('.viewer-bottom strong').textContent,'Wish You Were Here');
    await h.swipe('.viewer-body',100);
    assert.equal(document.querySelector('.viewer-body img').getAttribute('src'),'/art-v11/work-1.webp');
  } finally {await h.cleanup();}
});

test('project swipes update selection and visual, respecting reduced motion',async()=>{
  const h=await mount(SelectedWorkExplorer);
  try {
    await h.swipe('.selected-work-preview-stage',-100);
    assert.match(document.querySelector('.selected-work-project-preview').textContent,/Ask Eve/);
    assert.match(document.querySelector('.selected-work-preview-stage img').getAttribute('src'),/eve-poster/);
    assert.equal(h.scrolls.at(-1).behavior,'instant');
    await h.swipe('.selected-work-preview-stage',100);
    assert.match(document.querySelector('.selected-work-preview-stage img').getAttribute('src'),/lab-poster/);
  } finally {await h.cleanup();}
});
