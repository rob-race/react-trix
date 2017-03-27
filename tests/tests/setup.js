"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsdom_1 = require("jsdom");
global.document = jsdom_1.jsdom("<!doctype html><html><head></head><body><script src=\"https://rawgit.com/basecamp/trix/master/dist/trix.js\"></script></body></html>");
global.window = document.defaultView;
global.navigator = {
    userAgent: 'node.js'
};
Object.keys(document.defaultView).forEach(function (property) {
    if (typeof global[property] == "undefined") {
        global[property] = document.defaultView[property];
    }
});
console.log("setup ran");
