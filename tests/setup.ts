declare var global: any;

import { jsdom } from "jsdom";

const html = `
<!doctype html><html><head></head><body>
<div id="app"></div>
<script src="https://rawgit.com/basecamp/trix/master/dist/trix.js"></script>
</body></html>`;

global.document = jsdom(html);
global.window = document.defaultView;

console.log("trix", global.window.Trix);

global.navigator = {
  userAgent: 'node.js'
};

Object.keys(document.defaultView).forEach((property) => {
  if (typeof global[property] == "undefined") {
    global[property] = document.defaultView[property];
  }
});