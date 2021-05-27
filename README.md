# React Trix 0.9.0

React wrapper around [Trix](https://github.com/basecamp/trix) editor from Basecamp. With additional features that I
needed when I was CTO at Roadmap when sending emails and collaborating with comments.

## Getting started

### Install via npm

```bash
npm install react-trix --save
```

Trix will be included as dependency. You should already have [React](https://facebook.github.io/react) installed.

### Usage

Make sure you have the latest Trix JavaScript and optionally their CSS on pages where you are using react-trix.

#### Classic script tag

```html
<script src="https://rawgit.com/basecamp/trix/master/dist/trix.js"></script>
```

#### Or via npm

```bash
npm i trix
```

```jsx
import "trix/dist/trix";
```

If you're using npm version with SSR make sure to import trix on page level.

```jsx
import * as React from "react";
import { TrixEditor } from "react-trix";

export class Test extends React.Component {
  handleEditorReady(editor) {
    // this is a reference back to the editor if you want to
    // do editing programatically
    editor.insertString("editor is ready");
  }
  handleChange(html, text) {
    // html is the new html content
    // text is the new text content
  }
  render() {
    return (
      <TrixEditor onChange={this.handleChange} onEditorReady={this.handleEditorReady} />
    );
  }
}
```

### Properties

Those are the optional properties you can use on the `<TrixEditor />`.

**New in v0.7.0**

The default name for the file upload is `file`. You may use the `fileParamName` 
to change its name, for instance `blob` to work with Ruby on Rails.

```jsx
let mergeTags = [{
  trigger: "@",
  tags: [
    {name: "Dominic St-Pierre", tag: "@dominic"},
    {name: "John Doe", tag: "@john"}
  ]
}, {
  trigger: "{",
  tags: [
    {name: "First name", tag: "{{ .FirstName }}"},
    {name: "Last name", tag: "{{ .LastName }}"}
  ]
}]
<TrixEditor
  className="custom-css-class"
  autoFocus={true}
  placeholder="editor's placeholder"
  value="initial content <strong>for the editor</strong>"
  uploadURL="https://domain.com/imgupload/receiving/post"
  uploadData={{"key1": "value", "key2": "value"}}
  fileParamName="blob"
  mergeTags={mergeTags}
  onChange={on_change_handler}
  onEditorReady={on_editor_ready_handler}
/>
```

### Merge tags

You give a trigger character, for example "@" and when the user type this character a small popup suggestions
will be displayed where user can click and the `tag` will be added.

You may customize the suggestion box via the CSS class `react-trix-suggestions` like this:

```css
.react-trix-suggestions {
  /* for the container */
}

.react-trix-suggestions a {
  /* for each suggestion */
}
```

## Running the tests

Still having some issues testing Trix with enzyme/jsdom.

## Contributions

Contributions are welcome and appreciated.
