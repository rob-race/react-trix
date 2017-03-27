/// <reference types="react" />
import * as React from "react";
export interface TrixEditorProps {
    autoFocus?: boolean;
    placeholder?: string;
    value?: string;
    uploadURL?: string;
    uploadData?: {
        [key: string]: string;
    };
    onEditorReady?: (editor: any) => void;
    onChange: (html: string, text: string) => void;
}
export declare class TrixEditor extends React.Component<TrixEditorProps, {}> {
    private id;
    private editor;
    constructor(props: TrixEditorProps);
    private generateId();
    componentDidMount(): void;
    componentWillUnmount(): void;
    private handleChange(e);
    private handleUpload(e);
    private uploadAttachment(attachment);
    render(): JSX.Element;
}
