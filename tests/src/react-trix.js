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
        _this.id = _this.generateId();
        console.log("ctor");
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
        var props = this.props;
        console.log("get by id", this.id);
        console.log(document.body.innerHTML);
        this.editor = document.getElementById("editor-" + this.id);
        if (this.editor) {
            this.editor.addEventListener('trix-initialize', this.handleChange.bind(this));
            this.editor.addEventListener('trix-change', this.handleChange.bind(this));
            if (props.uploadURL) {
                this.editor.addEventListener("trix-attachment-add", this.handleUpload.bind(this));
            }
            if (props.onEditorReady && typeof props.onEditorReady == "function") {
                props.onEditorReady(this.editor);
            }
        }
        else {
            console.error("editor not found");
        }
        console.log("did mount");
    };
    TrixEditor.prototype.componentWillUnmount = function () {
        this.editor.removeEventListener("trix-initialize", this.handleChange);
        this.editor.removeEventListener("trix-change", this.handleChange);
        if (this.props.uploadURL) {
            this.editor.removeEventListener("trix-attachment-add", this.handleUpload);
        }
        console.log("will unmount");
    };
    TrixEditor.prototype.handleChange = function (e) {
        if (this.props.onChange) {
            this.props.onChange(e.target.innerHTML, e.target.innerText);
            console.log("on change");
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
        console.log("id:", this.id);
        return (React.createElement("div", null,
            React.createElement("trix-editor", attributes),
            React.createElement("input", { type: "hidden", id: "input-" + this.id, value: this.props.value })));
    };
    return TrixEditor;
}(React.Component));
exports.TrixEditor = TrixEditor;
