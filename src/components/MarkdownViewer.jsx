import React, { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";
import "./MarkdownViewer.scss";

export default function({ filePath }) {
  const [data, setData] = useState();

  useEffect(() => {
    fetch(filePath)
      .then((res) => res.text())
      .then(setData);
  });

  return data ? (
    <ReactMarkdown
      plugins={[gfm]}
      children={data}
      className="react-markdown-viewer"
    />
  ) : (
    <p>Loading...</p>
  );
}
