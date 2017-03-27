declare var global: any;

import { jsdom } from "jsdom";

global.document = jsdom(`<!doctype html><html><head></head><body><script src="https://rawgit.com/basecamp/trix/master/dist/trix.js"></script></body></html>`);
global.window = document.defaultView;

global.navigator = {
  userAgent: 'node.js'
};

Object.keys(document.defaultView).forEach((property) => {
  if (typeof global[property] == "undefined") {
    global[property] = document.defaultView[property];
  }
});

console.log("setup ran");