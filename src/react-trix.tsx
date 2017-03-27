import * as React from "react";

export interface TrixEditorProps {
  autoFocus?: boolean;
  placeholder?: string;
  value?: string;
  uploadURL?: string;
  uploadData?: { [key: string]: string };
  onEditorReady?: (editor: any) => void;
  onChange: (html: string, text: string) => void;
}

export class TrixEditor extends React.Component<TrixEditorProps, {}> {
  private id: string;
  private editor: any = null;
  constructor(props: TrixEditorProps) {
    super(props);

    this.id = this.generateId();
    console.log("ctor");
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
    let props = this.props;

    console.log("get by id", this.id);

    console.log(document.body.innerHTML);

    this.editor = document.getElementById(`editor-${this.id}`);
    if (this.editor) {
      this.editor.addEventListener('trix-initialize', this.handleChange.bind(this));
      this.editor.addEventListener('trix-change', this.handleChange.bind(this));

      if (props.uploadURL) {
        this.editor.addEventListener("trix-attachment-add", this.handleUpload.bind(this));
      }

      if (props.onEditorReady && typeof props.onEditorReady == "function") {
        props.onEditorReady(this.editor);
      }
    } else {
      console.error("editor not found");
    }

    console.log("did mount");
  }
  componentWillUnmount() {
    this.editor.removeEventListener("trix-initialize", this.handleChange);
    this.editor.removeEventListener("trix-change", this.handleChange);

    if (this.props.uploadURL) {
      this.editor.removeEventListener("trix-attachment-add", this.handleUpload);
    }

    console.log("will unmount");
  }
  private handleChange(e) {
    if (this.props.onChange) {
      this.props.onChange(e.target.innerHTML, e.target.innerText);
      console.log("on change");
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
    let props = this.props;

    var attributes: { [key: string]: string } = {
      "id": `editor-${this.id}`,
      "input": `input-${this.id}`
    };

    if (props.autoFocus) {
      attributes["autoFocus"] = props.autoFocus.toString();
    }

    if (props.placeholder) {
      attributes["placeholder"] = props.placeholder;
    }

    console.log("id:", this.id);

    return (
      <div>
        {React.createElement("trix-editor", attributes)}
        <input
          type="hidden"
          id={`input-${this.id}`}
          value={this.props.value}
        />
      </div>
    );
  }
}