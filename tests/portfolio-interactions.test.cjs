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
  const frames = new Map(); let frameId = 0;
  global.requestAnimationFrame = callback => {frames.set(++frameId,callback);return frameId;};
  global.cancelAnimationFrame = id => frames.delete(id);
  const scrolls = [];
  window.HTMLElement.prototype.setPointerCapture=function(id){this.captureId=id;};
  window.HTMLElement.prototype.hasPointerCapture=function(id){return this.captureId===id;};
  window.HTMLElement.prototype.releasePointerCapture=function(){this.captureId=null;};
  window.HTMLElement.prototype.scrollIntoView = function(options) {scrolls.push(options);};
  window.HTMLElement.prototype.scrollTo = function(options) {scrolls.push(options);};
  window.HTMLDialogElement.prototype.showModal = function() {this.setAttribute('open','');};
  window.HTMLDialogElement.prototype.close = function() {this.removeAttribute('open');};
  const root = createRoot(document.getElementById('root'));
  await act(async()=>root.render(React.createElement(Component,props)));
  return {
    scrolls,
    async event(selector,type) {await act(async()=>document.querySelector(selector).dispatchEvent(new window.Event(type,{bubbles:true})));},
    async frame() {await act(async()=>{const callbacks=[...frames.values()];frames.clear();callbacks.forEach(callback=>callback());});},
    async click(selector) {await act(async()=>document.querySelector(selector).click());},
    async pointer(selector,type,x=200,y=100,extra={}) {
      await act(async()=>{
        const event=new window.Event(type,{bubbles:true});
        Object.assign(event,{pointerId:1,pointerType:'touch',isPrimary:true,clientX:x,clientY:y,...extra});
        document.querySelector(selector).dispatchEvent(event);
      });
    },
    async swipe(selector,dx,dy=0) {
      await act(async()=>{
        const el=document.querySelector(selector);
        if(el.closest('.selected-work-preview-stage')) {
          for(const [type,x,y] of [['pointerdown',200,100],['pointermove',200+dx,100+dy],['pointerup',200+dx,100+dy]]) {
            const event=new window.Event(type,{bubbles:true});
            Object.assign(event,{pointerId:1,pointerType:'touch',isPrimary:true,clientX:x,clientY:y});
            el.dispatchEvent(event);
          }
          return;
        }
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


function mobileStrip() {
  Object.defineProperty(window,'innerWidth',{value:390,configurable:true});
  const strip=document.querySelector('.selected-work-scroll');
  Object.defineProperty(strip,'scrollWidth',{value:1600,configurable:true});
  Object.defineProperty(strip,'clientWidth',{value:346,configurable:true});
  strip.getBoundingClientRect=()=>({left:22});
  [...strip.querySelectorAll('button')].forEach((button,index)=>{
    button.getBoundingClientRect=()=>({left:22+index*200-strip.scrollLeft});
  });
  return strip;
}

test('animated strip scroll cannot undo a preview swipe; each consecutive swipe advances once',async()=>{
  const h=await mount(SelectedWorkExplorer);
  try {
    const strip=mobileStrip();
    window.matchMedia=()=>({matches:false});
    await h.swipe('.selected-work-preview-stage',-100);
    assert.equal(h.scrolls.at(-1).left,200);
    assert.equal(h.scrolls.at(-1).behavior,'smooth');
    strip.scrollLeft=30; // first animation frame still nearest the OLD project
    await h.event('.selected-work-scroll','scroll');await h.frame();
    assert.match(document.querySelector('.selected-work-project-description h4').textContent,/Ask Eve/);
    await h.swipe('.selected-work-preview-stage',-100);
    strip.scrollLeft=210; // next animation crosses the previous project
    await h.event('.selected-work-scroll','scroll');await h.frame();
    assert.equal(document.querySelector('.selected-work-project-description h4').textContent,'Chatroom');
  } finally {await h.cleanup();}
});

test('native strip gestures reclaim selection and can select the last card',async()=>{
  const h=await mount(SelectedWorkExplorer);
  try {
    const strip=mobileStrip();
    await h.swipe('.selected-work-preview-stage',-100);
    await h.event('.selected-work-scroll','pointerdown');
    strip.scrollLeft=400;
    await h.event('.selected-work-scroll','scroll');await h.frame();
    assert.equal(document.querySelector('.selected-work-project-description h4').textContent,'Chatroom');
    strip.scrollLeft=1254;
    await h.event('.selected-work-scroll','scroll');await h.frame();
    assert.equal(document.querySelector('.selected-work-project-description h4').textContent,'Good World Living');
    await h.swipe('.selected-work-preview-stage',100);
    assert.equal(document.querySelector('.selected-work-project-description h4').textContent,'Whitespace');
  } finally {await h.cleanup();}
});


test('swipes starting on preview images advance once; cancellation and vertical scrolling do not',async()=>{
  const h=await mount(SelectedWorkExplorer);
  try {
    mobileStrip();
    await h.swipe('.selected-work-preview-stage img',-100);
    assert.equal(document.querySelector('.selected-work-project-description h4').textContent,'Ask Eve');
    await h.swipe('.selected-work-preview-stage img',-100);
    assert.equal(document.querySelector('.selected-work-project-description h4').textContent,'Chatroom');
    await h.pointer('.selected-work-preview-stage img','pointerdown');
    assert.equal(document.querySelector('.selected-work-preview-stage').captureId,1);
    await h.pointer('.selected-work-preview-stage','pointercancel');
    await h.pointer('.selected-work-preview-stage','pointerup',80);
    assert.equal(document.querySelector('.selected-work-project-description h4').textContent,'Chatroom');
    await h.pointer('.selected-work-preview-stage img','pointerdown');
    await h.pointer('.selected-work-preview-stage','pointermove',198,140);
    await h.pointer('.selected-work-preview-stage','pointerup',80,140);
    assert.equal(document.querySelector('.selected-work-project-description h4').textContent,'Chatroom');
    await h.swipe('.selected-work-preview-stage img',100);
    assert.equal(document.querySelector('.selected-work-project-description h4').textContent,'Ask Eve');
  } finally {await h.cleanup();}
});
