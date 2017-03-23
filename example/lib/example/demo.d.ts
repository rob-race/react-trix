/// <reference types="react" />
import * as React from "react";
export interface IState {
    html: string;
    text: string;
}
export declare class App extends React.Component<any, IState> {
    constructor();
    handleChange(html: string, text: string): void;
    render(): JSX.Element;
}
