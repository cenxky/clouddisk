import React from "react";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";
import { Prism } from "react-syntax-highlighter";
import "./MarkdownViewer.scss";

export default function(props) {
  const { data } = props;
  const renderers = {
    code: ({ language, value }) => (
      <Prism language={language} children={value} />
    ),
  };

  return (
    <ReactMarkdown
      plugins={[gfm]}
      children={data}
      renderers={renderers}
      className="react-markdown-viewer"
    />
  );
}
