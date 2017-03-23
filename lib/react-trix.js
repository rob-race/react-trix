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
var React = require("react");
var TrixEditor = (function (_super) {
    __extends(TrixEditor, _super);
    function TrixEditor(props) {
        var _this = _super.call(this, props) || this;
        _this.editor = null;
        _this.state = {
            id: _this.generateId()
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
        var state = this.state;
        var props = this.props;
        var elm = document.createElement("trix-editor");
        elm.id = "editor-" + state.id;
        elm.setAttribute("input", "input-" + state.id);
        if (props.autoFocus) {
            elm.setAttribute("autoFocus", props.autoFocus.toString());
        }
        if (props.placeholder) {
            elm.setAttribute("placeholder", props.placeholder);
        }
        document.getElementById("te-" + this.state.id).appendChild(elm);
        this.editor = document.getElementById("editor-" + this.state.id);
        this.editor.addEventListener('trix-initialize', this.handleChange.bind(this));
        this.editor.addEventListener('trix-change', this.handleChange.bind(this));
        if (this.props.uploadURL) {
            this.editor.addEventListener("trix-attachment-add", this.handleUpload.bind(this));
        }
    };
    TrixEditor.prototype.componentWillUnmount = function () {
        this.editor.removeEventListener("trix-initialize", this.handleChange);
        this.editor.removeEventListener("trix-change", this.handleChange);
        if (this.props.uploadURL) {
            this.editor.removeEventListener("trix-attachment-add", this.handleUpload);
        }
    };
    TrixEditor.prototype.handleChange = function (e) {
        if (this.props.onChange) {
            this.props.onChange(e.target.innerHTML, e.target.innerText);
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
            if (xhr.status == 204) {
                url = href = xhr.responseText;
                return attachment.setAttributes({
                    url: url,
                    href: href
                });
            }
        };
        return xhr.send(form);
    };
    TrixEditor.prototype.render = function () {
        var state = this.state;
        return (React.createElement("div", { id: "te-" + state.id },
            React.createElement("input", { type: "hidden", id: "input-" + state.id, value: this.props.value })));
    };
    return TrixEditor;
}(React.Component));
exports.default = TrixEditor;
//# sourceMappingURL=react-trix.js.map