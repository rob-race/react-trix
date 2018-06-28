(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("React"));
	else if(typeof define === 'function' && define.amd)
		define(["React"], factory);
	else if(typeof exports === 'object')
		exports["react-trix"] = factory(require("React"));
	else
		root["react-trix"] = factory(root["React"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_0__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "dist/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_0__;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(0);
var TrixEditor = (function (_super) {
    __extends(TrixEditor, _super);
    function TrixEditor(props) {
        var _this = _super.call(this, props) || this;
        _this.container = null;
        _this.editor = null;
        _this.d = null;
        _this.id = _this.generateId();
        _this.state = {
            showMergeTags: false,
            tags: []
        };
        return _this;
    }
    TrixEditor.prototype.generateId = function () {
        var timestamp = Date.now();
        var uniqueNumber = 0;
        (function () {
            if (timestamp <= uniqueNumber) {
                timestamp = ++uniqueNumber;
            }
            else {
                uniqueNumber = timestamp;
            }
        })();
        return "T" + timestamp.toString();
    };
    TrixEditor.prototype.componentDidMount = function () {
        var _this = this;
        var props = this.props;
        this.container = document.getElementById("editor-" + this.id);
        if (this.container) {
            this.container.addEventListener("trix-initialize", function () {
                _this.editor = _this.container.editor;
                if (!_this.editor) {
                    console.error("cannot  find trix editor");
                }
                if (props.onEditorReady && typeof props.onEditorReady == "function") {
                    props.onEditorReady(_this.editor);
                }
            }, false);
            this.container.addEventListener('trix-change', this.handleChange.bind(this), false);
            if (props.uploadURL) {
                this.container.addEventListener("trix-attachment-add", this.handleUpload.bind(this));
            }
        }
        else {
            console.error("editor not found");
        }
    };
    TrixEditor.prototype.componentWillUnmount = function () {
        this.container.removeEventListener("trix-initialize", this.handleChange);
        this.container.removeEventListener("trix-change", this.handleChange);
        if (this.props.uploadURL) {
            this.container.removeEventListener("trix-attachment-add", this.handleUpload);
        }
    };
    TrixEditor.prototype.handleChange = function (e) {
        var props = this.props;
        var state = this.state;
        var text = e.target.innerText;
        if (props.onChange) {
            props.onChange(e.target.innerHTML, text);
        }
        var range = this.editor.getSelectedRange();
        if (text && range[0] == range[1]) {
            if (props.mergeTags) {
                var lastChar = range[0] - 1;
                if (lastChar >= 0 && lastChar < text.length) {
                    var trigger = text[lastChar];
                    for (var i = 0; i < props.mergeTags.length; i++) {
                        if (trigger == props.mergeTags[i].trigger) {
                            state.showMergeTags = true;
                            state.tags = props.mergeTags[i].tags;
                            this.setState(state);
                            break;
                        }
                    }
                }
            }
        }
    };
    TrixEditor.prototype.handleUpload = function (e) {
        var attachment = e.attachment;
        if (attachment.file) {
            return this.uploadAttachment(attachment);
        }
    };
    TrixEditor.prototype.uploadAttachment = function (attachment) {
        var file, form, xhr;
        file = attachment.file;
        form = new FormData();
        if (this.props.uploadData) {
            for (var k in this.props.uploadData) {
                form[k] = this.props.uploadData[k];
            }
        }
        form.append("Content-Type", file.type);
        form.append("file", file);
        xhr = new XMLHttpRequest();
        xhr.open("POST", this.props.uploadURL, true);
        xhr.upload.onprogress = function (event) {
            var progress = event.loaded / event.total * 100;
            return attachment.setUploadProgress(progress);
        };
        xhr.onload = function () {
            var href, url;
            if (xhr.status >= 200 && xhr.status < 300) {
                url = href = xhr.responseText;
                return attachment.setAttributes({
                    url: url,
                    href: href
                });
            }
        };
        return xhr.send(form);
    };
    TrixEditor.prototype.handleTagSelected = function (t, e) {
        e.preventDefault();
        var state = this.state;
        state.showMergeTags = false;
        this.setState(state);
        this.editor.expandSelectionInDirection("backward");
        this.editor.insertString(t.tag);
    };
    TrixEditor.prototype.renderTagSelector = function (tags) {
        var _this = this;
        if (!tags) {
            return null;
        }
        var editorPosition = document.getElementById("trix-editor-top-level").getBoundingClientRect();
        var rect = this.editor.getClientRectAtPosition(this.editor.getSelectedRange()[0]);
        var boxStyle = {
            "position": "absolute",
            "top": rect.top + 25 - editorPosition.top,
            "left": rect.left + 25 - editorPosition.left,
            "width": "250px",
            "boxSizing": "border-box",
            "padding": 0,
            "margin": ".2em 0 0",
            "backgroundColor": "hsla(0,0%,100%,.9)",
            "borderRadius": ".3em",
            "background": "linear-gradient(to bottom right, white, hsla(0,0%,100%,.8))",
            "border": "1px solid rgba(0,0,0,.3)",
            "boxShadow": ".05em .2em .6em rgba(0,0,0,.2)",
            "textShadow": "none"
        };
        var tagStyle = {
            "display": "block",
            "padding": ".2em .5em",
            "cursor": "pointer"
        };
        return (React.createElement("div", { style: boxStyle, className: "react-trix-suggestions" }, tags.map(function (t) {
            return React.createElement("a", { key: t.name, style: tagStyle, href: "#", onClick: _this.handleTagSelected.bind(_this, t) }, t.name);
        })));
    };
    TrixEditor.prototype.render = function () {
        var _this = this;
        var state = this.state;
        var props = this.props;
        var attributes = {
            "id": "editor-" + this.id,
            "input": "input-" + this.id
        };
        if (props.autoFocus) {
            attributes["autoFocus"] = props.autoFocus.toString();
        }
        if (props.placeholder) {
            attributes["placeholder"] = props.placeholder;
        }
        var mergetags = null;
        if (state.showMergeTags) {
            mergetags = this.renderTagSelector(state.tags);
        }
        return (React.createElement("div", { id: "trix-editor-top-level", ref: function (d) { return _this.d = d; }, style: { "position": "relative" } },
            React.createElement("trix-editor", attributes),
            React.createElement("input", { type: "hidden", id: "input-" + this.id, value: this.props.value }),
            mergetags));
    };
    return TrixEditor;
}(React.Component));
exports.TrixEditor = TrixEditor;


/***/ })
/******/ ]);
});