import * as React from "react";
import * as Trix from "trix";

export interface IState {
  id: string;
}

export interface TrixEditorProps {
  autoFocus?: boolean;
  placeholder?: string;
  value?: string;
  uploadURL?: string;
  uploadData?: { [key: string]: string };
  onChange: (html: string, text: string) => void;
}

export default class TrixEditor extends React.Component<TrixEditorProps, IState> {
  private editor: any = null;
  constructor(props: TrixEditorProps) {
    super(props);

    this.state = {
      id: this.generateId()
    }
  }
  private generateId(): string {
    let timestamp = Date.now();
    let uniqueNumber = 0;

    (() => {
      // If created at same millisecond as previous
      if (timestamp <= uniqueNumber) {
        timestamp = ++uniqueNumber;
      } else {
        uniqueNumber = timestamp;
      }
    })();
    return "T" + timestamp.toString();
  }
  componentDidMount() {
    let state = this.state;
    let props = this.props;

    const elm = document.createElement("trix-editor");
    elm.id = `editor-${state.id}`;
    elm.setAttribute("input", `input-${state.id}`);

    if (props.autoFocus) {
      elm.setAttribute("autoFocus", props.autoFocus.toString());
    }

    if (props.placeholder) {
      elm.setAttribute("placeholder", props.placeholder);
    }
    document.getElementById(`te-${this.state.id}`).appendChild(elm);

    this.editor = document.getElementById(`editor-${this.state.id}`);
    this.editor.addEventListener('trix-initialize', this.handleChange.bind(this));
    this.editor.addEventListener('trix-change', this.handleChange.bind(this));

    if (this.props.uploadURL) {
      this.editor.addEventListener("trix-attachment-add", this.handleUpload.bind(this));
    }
  }
  componentWillUnmount() {
    this.editor.removeEventListener("trix-initialize", this.handleChange);
    this.editor.removeEventListener("trix-change", this.handleChange);

    if (this.props.uploadURL) {
      this.editor.removeEventListener("trix-attachment-add", this.handleUpload);
    }
  }
  private handleChange(e) {
    if (this.props.onChange) {
      this.props.onChange(e.target.innerHTML, e.target.innerText);
    }
  }
  private handleUpload(e: any) {
    var attachment = e.attachment;
    if (attachment.file) {
      return this.uploadAttachment(attachment);
    }
  }
  private uploadAttachment(attachment: any) {
    var file, form, xhr;
    file = attachment.file;
    form = new FormData();
    // add any custom data that were passed
    if (this.props.uploadData) {
      for (var k in this.props.uploadData) {
        form[k] = this.props.uploadData[k];
      }
    }
    form.append("Content-Type", file.type);
    form.append("file", file);
    xhr = new XMLHttpRequest();
    xhr.open("POST", this.props.uploadURL, true);
    xhr.upload.onprogress = (event) => {
      var progress = event.loaded / event.total * 100;
      return attachment.setUploadProgress(progress);
    };
    xhr.onload = () => {
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
  }
  render() {
    let state = this.state;



    return (
      <div id={`te-${state.id}`}>
        <input
          type="hidden"
          id={`input-${state.id}`}
          value={this.props.value}
        />
      </div>
    );
  }
}