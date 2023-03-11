import jsdom from 'jsdom';
const { JSDOM } = jsdom;

const dom = new JSDOM(`<!DOCTYPE html><body><main id="root" class="main"></body>`, {
  url: 'https://localhost:3000',
  contentType: 'text/html',
});

global.window = dom.window as any;
global.document = dom.window.document as any;
