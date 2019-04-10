import * as React from "react";
import { BoxSizingProperty } from "csstype";

export interface MergeTag {
  tag: string;
  name: string;
}

export interface MergeTags {
  trigger: string;
  tags: Array<MergeTag>;
}

export interface TrixEditorProps {
  autoFocus?: boolean;
  placeholder?: string;
  value?: string;
  uploadURL?: string;
  uploadData?: { [key: string]: string };

  /* list of available merge tag */
  mergeTags: Array<MergeTags>;

  onEditorReady?: (editor: any) => void;
  onChange: (html: string, text: string) => void;
}

export interface TrixEditorState {
  showMergeTags: boolean;
  tags: Array<MergeTag>;
}

export interface Editor {
  getSelectedRange: () => Array<number>;
  setSelectedRange: (range: Array<number>) => void;
  getClientRectAtPosition: (pos: number) => Rect;
  expandSelectionInDirection: (direction: "forward" | "backward") => void;
  insertString: (s: string) => void;
}

export interface Rect {
  top: number;
  left: number;
  right: number;
  bottom: number;
  width: number;
  height: number;
}

export class TrixEditor extends React.Component<TrixEditorProps, TrixEditorState> {
  private id: string;
  private container: any = null;
  private editor: Editor = null;
  private d: HTMLDivElement = null;
  constructor(props: TrixEditorProps) {
    super(props);

    this.id = this.generateId();

    this.state = {
      showMergeTags: false,
      tags: []
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
    let props = this.props;

    this.container = document.getElementById(`editor-${this.id}`);
    //this.container = this.d && this.d.children && this.d.children.length >= 2 ? this.d.children[1] : null;
    //this.editor = this.d;
    if (this.container) {
      this.container.addEventListener("trix-initialize", () => {
        this.editor = this.container.editor;
        if (!this.editor) {
          console.error("cannot  find trix editor");
        }

        if (props.onEditorReady && typeof props.onEditorReady == "function") {
          props.onEditorReady(this.editor);
        }
      }, false);
      this.container.addEventListener('trix-change', this.handleChange.bind(this), false);

      if (props.uploadURL) {
        this.container.addEventListener("trix-attachment-add", this.handleUpload.bind(this));
      }
    } else {
      console.error("editor not found");
    }
  }
  componentWillUnmount() {
    this.container.removeEventListener("trix-initialize", this.handleChange);
    this.container.removeEventListener("trix-change", this.handleChange);

    if (this.props.uploadURL) {
      this.container.removeEventListener("trix-attachment-add", this.handleUpload);
    }
  }
  private handleChange(e) {
    const props = this.props;
    let state: TrixEditorState = this.state;
    const text: string = e.target.innerText;

    if (props.onChange) {
      props.onChange(e.target.innerHTML, text);
    }

    const range = this.editor.getSelectedRange();

    // if we have a collapse selection
    if (text && range[0] == range[1]) {
      // if we have a merge tag mergeTagTrigger
      if (props.mergeTags) {
        // get the cursor position and compare the last character with our mergeTagTrigger
        const lastChar = range[0] - 1;
        if (lastChar >= 0 && lastChar < text.length) {
          const trigger = text[lastChar];
          for (let i = 0; i < props.mergeTags.length; i++) {
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
        form.append(k, this.props.uploadData[k]);
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
      if (xhr.status >= 200 && xhr.status < 300) {
        url = href = xhr.responseText;
        return attachment.setAttributes({
          url: url,
          href: href
        });
      }
    };
    return xhr.send(form);
  }
  private handleTagSelected(t: MergeTag, e: React.MouseEvent<HTMLAnchorElement>): void {
    e.preventDefault();

    let state: TrixEditorState = this.state;
    state.showMergeTags = false;
    this.setState(state);

    this.editor.expandSelectionInDirection("backward");
    this.editor.insertString(t.tag);
  }
  private renderTagSelector(tags: Array<MergeTag>): React.ReactNode {
    if (!tags) {
      return null;
    }

    const editorPosition = document.getElementById("trix-editor-top-level").getBoundingClientRect();
    
    // current cursor position
    const rect = this.editor.getClientRectAtPosition(this.editor.getSelectedRange()[0]);
    const boxStyle = {
      "position": "absolute" as "absolute",
      "top": rect.top + 25 - editorPosition.top,
      "left": rect.left + 25 - editorPosition.left,
      "width": "250px",
      "boxSizing": "border-box" as BoxSizingProperty,
      "padding": 0,
      "margin": ".2em 0 0",
      "backgroundColor": "hsla(0,0%,100%,.9)",
      "borderRadius": ".3em",
      "background": "linear-gradient(to bottom right, white, hsla(0,0%,100%,.8))",
      "border": "1px solid rgba(0,0,0,.3)",
      "boxShadow": ".05em .2em .6em rgba(0,0,0,.2)",
	    "textShadow": "none"
    };
    const tagStyle = {
      "display": "block",
      "padding": ".2em .5em",
      "cursor": "pointer"
    }
    return (
      <div style={boxStyle} className="react-trix-suggestions">
        {tags.map((t) => {
          return <a key={t.name} style={tagStyle} href="#" onClick={this.handleTagSelected.bind(this, t)}>{t.name}</a>
        })}
      </div>
    );
  }
  render() {
    let state: TrixEditorState = this.state;
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
		
		if (props.toolbar) {
			attributes["toolbar"] = props.toolbar;
		}

    let mergetags: React.ReactNode = null;
    if (state.showMergeTags) {
      mergetags = this.renderTagSelector(state.tags);
    }
    return (
      <div id="trix-editor-top-level" ref={(d) => this.d = d} style={{ "position": "relative" }}>
        {React.createElement("trix-editor", attributes)}
        <input
          type="hidden"
          id={`input-${this.id}`}
          value={this.props.value}
        />
        {mergetags}
      </div>
    );
  }
}
