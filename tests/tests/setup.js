"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsdom_1 = require("jsdom");
var html = "\n<!doctype html><html><head></head><body>\n<div id=\"app\"></div>\n<script src=\"https://rawgit.com/basecamp/trix/master/dist/trix.js\"></script>\n</body></html>";
global.document = jsdom_1.jsdom(html);
global.window = document.defaultView;
console.log("trix", global.window.Trix);
global.navigator = {
    userAgent: 'node.js'
};
Object.keys(document.defaultView).forEach(function (property) {
    if (typeof global[property] == "undefined") {
        global[property] = document.defaultView[property];
    }
});
