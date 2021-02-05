import React from "react";
import { Prism } from "react-syntax-highlighter";
import MarkdownViewer from "./MarkdownViewer";

export default function(props) {
  const { fileType, data, language } = props;

  switch (fileType) {
    case "md":
      return <MarkdownViewer {...props} />;
    default:
      const isSupported = Prism.supportedLanguages.includes(language);
      return (
        <Prism language={isSupported ? language : "text"} children={data} />
      );
  }
}
