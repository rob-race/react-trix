# React Trix 0.2.0

React wrapper around [Trix](https://github.com/basecamp/trix) editor from Basecamp. With additionnal features that wer'e
needing at [Roadmap](https://roadmap.space).

## Getting started

### Install via npm

```bash
npm install react-trix --save
```

Trix will be included as dependency. You should already have [React](https://facebook.github.io/react) installed.

### Usage

```js
import * as React from "react";
import { TrixEditor } from "react-trix";

export class Test extends Rect.Component {
  handleChange(html, text) {
    // html is the new html content
    // text is the new text content
  }
  render() {
    return (
      <TrixEditor onChange={this.handleChange} />
    );
  }
}
```

### Properties

Those are the properties you can use on the `<TrixEditor />`.

```js
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
  autoFocus={true}
  placeholder="editor's placeholder"
  value="initial content <strong>for the editor</strong>"
  uploadURL="https://domain.com/imgupload/receiving/post"
  uploadData={{"key1": "value", "key2": "value"}}
  mergeTags={mergeTags}
/>
```

### Merge tags

You give a trigger character, for example "@" and when the user typed this character a small popup suggestions
will be displayed where user can click and the `tag` will be added.

## Running the tests

Still having some issues testing Trix with enzyme/jsdom.

## Contributions

Contributions are welcome and appreciated.

