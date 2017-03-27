declare var global: any;

import * as React from "react";
import { expect } from "chai";
import { shallow, mount, render } from "enzyme";
import { spy } from "sinon";

import { TrixEditor } from "../src/react-trix";

import { jsdom } from "jsdom";

describe("<TrixEditor />", () => {
  it("renders the Trix editor", function () {
    const handleChange = spy();
    const wrapper = mount(<TrixEditor onChange={handleChange} value="testing 1234" />);
    console.log(global.document._ids);
    console.log(wrapper.debug());
    expect(handleChange).to.have.property('callCount', 1);
  });
});