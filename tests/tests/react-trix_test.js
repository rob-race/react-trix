"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var chai_1 = require("chai");
var enzyme_1 = require("enzyme");
var sinon_1 = require("sinon");
var react_trix_1 = require("../src/react-trix");
var jsdom_1 = require("jsdom");
var domLoaded = function (cb) {
    global.navigator = {
        userAgent: 'node.js'
    };
    jsdom_1.jsdom.env({
        html: "<!doctype html><html><head></head><body></body></html>",
        scripts: [
            "https://rawgit.com/basecamp/trix/master/dist/trix.js"
        ],
        done: function (err, win) {
            global.document = win.document;
            global.window = win;
            global.Trix = win.Trix;
            Object.keys(win).forEach(function (property) {
                if (typeof global[property] == "undefined") {
                    global[property] = win[property];
                }
            });
            console.log("before each cb from jsdom setup");
            cb();
        }
    });
};
describe("<TrixEditor />", function () {
    it("renders the Trix editor", function () {
        var handleChange = sinon_1.spy();
        var wrapper = enzyme_1.mount(React.createElement(react_trix_1.TrixEditor, { onChange: handleChange, value: "testing 1234" }));
        console.log(global.document._ids);
        console.log(wrapper.debug());
        chai_1.expect(handleChange).to.have.property('callCount', 1);
    });
});
