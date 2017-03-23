import * as React from "react";

export interface TrixEditorProps {
  /* set focus on the <trix-editor /> */
  autoFocus?: boolean;
  /* placeholder for the injected <trix-editor /> */
  placeholder?: string;
  /* initial value for Trix content */
  value?: string;
  /* set the URL where new attachments will be uploaded via a POST http request */
  uploadURL?: string;
  /* a dictionary of key-value that will be submitted via the formdata when uploading attachments */
  uploadData?: { [key: string]: string };

  /* fires when there's change to the content */
  onChange: (html: string, text: string) => void;
}

export class TrixEditor extends React.Component<TrixEditorProps, {}> { }