declare var global: any;

import * as React from "react";
import { expect } from "chai";
import { shallow, mount, render } from "enzyme";
import { spy } from "sinon";

import { TrixEditor } from "../src/react-trix";

import * as jsdom from "jsdom";
const virtualConsole = jsdom.createVirtualConsole();
virtualConsole.on('log', console.log);

const html = `
<!doctype html><html><head></head><body>
<div id="app"></div>

</body></html>`;

describe("<TrixEditor />", () => {
  beforeEach((done: MochaDone) => {
    jsdom.env({
      virtualConsole,
      html: html,
      scripts: [
        "https://rawgit.com/basecamp/trix/master/dist/trix.js"
      ],
      features: {
        FetchExternalResources: ['script'],
        ProcessExternalResources: ['script'],
        SkipExternalResources: false,
      },
      created(error, window) { // eslint no-unused-vars: 0
      },
      done(err, win) {
        if (err) {
          console.log("errors");
          console.log(err);
        } else {
          global.window = win;
          global.document = win.document;
          global.Trix = win.Trix;

          Object.keys(win).forEach((property) => {
            if (typeof global[property] == "undefined") {
              global[property] = win[property];
            }
          });

          //setTimeout(() => {
          done();
          //}, 500);

        }
      },
    });
  })
  it("renders the Trix editor", () => {
    const handleReady = spy();
    const handleChange = spy();
    const wrapper = mount(<TrixEditor onChange={handleChange} onEditorReady={handleReady} value="testing 1234" />);
    expect(handleReady.callCount).to.be.greaterThan(0);
    //expect(handleChange).to.have.property('callCount', 1);
  });
  it("fires the onChange event", (done: MochaDone) => {
    const handleReady = (editor: any) => {
      console.log("inside handleReady");
      console.log(editor);

      // get the editor and fake a selection + bold
      /*var elm: any = handleReady.getCall(0).args[0];
      elm.editor.setSelectedRange([0, 1]);
      elm.editor.activateAttribute("bold");
      */

      expect(handleChange.callCount).to.be.greaterThan(0);

      done();
    }
    const handleChange = spy();
    const wrapper = mount(<TrixEditor
      onChange={handleChange}
      onEditorReady={handleReady}
      value="testing 1234" />);
  });
});