"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var chai_1 = require("chai");
var enzyme_1 = require("enzyme");
var sinon_1 = require("sinon");
var react_trix_1 = require("../src/react-trix");
var jsdom = require("jsdom");
var virtualConsole = jsdom.createVirtualConsole();
virtualConsole.on('log', console.log);
var html = "\n<!doctype html><html><head></head><body>\n<div id=\"app\"></div>\n\n</body></html>";
describe("<TrixEditor />", function () {
    beforeEach(function (done) {
        jsdom.env({
            virtualConsole: virtualConsole,
            html: html,
            scripts: [
                "https://rawgit.com/basecamp/trix/master/dist/trix.js"
            ],
            features: {
                FetchExternalResources: ['script'],
                ProcessExternalResources: ['script'],
                SkipExternalResources: false,
            },
            created: function (error, window) {
            },
            done: function (err, win) {
                if (err) {
                    console.log("errors");
                    console.log(err);
                }
                else {
                    global.window = win;
                    global.document = win.document;
                    global.Trix = win.Trix;
                    Object.keys(win).forEach(function (property) {
                        if (typeof global[property] == "undefined") {
                            global[property] = win[property];
                        }
                    });
                    done();
                }
            },
        });
    });
    it("renders the Trix editor", function () {
        var handleReady = sinon_1.spy();
        var handleChange = sinon_1.spy();
        var wrapper = enzyme_1.mount(React.createElement(react_trix_1.TrixEditor, { onChange: handleChange, onEditorReady: handleReady, value: "testing 1234" }));
        chai_1.expect(handleReady.callCount).to.be.greaterThan(0);
    });
    it("fires the onChange event", function (done) {
        var handleReady = function (editor) {
            console.log("inside handleReady");
            console.log(editor);
            chai_1.expect(handleChange.callCount).to.be.greaterThan(0);
            done();
        };
        var handleChange = sinon_1.spy();
        var wrapper = enzyme_1.mount(React.createElement(react_trix_1.TrixEditor, { onChange: handleChange, onEditorReady: handleReady, value: "testing 1234" }));
    });
});
