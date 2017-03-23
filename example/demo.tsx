import * as React from "react";
import * as ReactDOM from "react-dom";
import { TrixEditor } from "../src/react-trix";

export interface IState {
  html: string;
  text: string;
}

export class App extends React.Component<any, IState> {
  constructor() {
    super();

    this.state = {
      html: "<b>Edit me</b>",
      text: "Edit me"
    };
  }
  handleChange(html: string, text: string) {
    this.setState({
      html: html,
      text: text
    });
  }
  render() {
    let state = this.state;

    return (
      <div>
        <TrixEditor
          autoFocus={true}
          placeholder="Testing the component"
          value={state.html}
          uploadURL="testing-upload"
          onChange={this.handleChange.bind(this)}
        />
        <div style={{ "paddingTop": "50px" }}>
          html: {state.html}
        </div>
        <hr />
        <div>
          text: {state.text}
        </div>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
console.log("what");