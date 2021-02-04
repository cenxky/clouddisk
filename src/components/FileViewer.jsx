import React, { useEffect, useLayoutEffect, useRef } from "react";
import ReactFileViewer from "react-file-viewer";
import MarkdownViewer from "./MarkdownViewer";
import "./FileViewer.scss";

class FileViewer extends ReactFileViewer {
  constructor(props) {
    super(props);
  }

  getDriver() {
    switch (this.props.fileType) {
      case "md": {
        return MarkdownViewer;
      }
      default: {
        return super.getDriver();
      }
    }
  }
}

export default function(props) {
  const { fileType, filePath, hideDialog } = props;
  const dialog = useRef();

  useLayoutEffect(() => {
    if (dialog.current) dialog.current.parentNode.style.padding = 0;
  });

  useEffect(() => {
    const overlayElement = document.querySelector(
      ".oc-fm--file-navigator__view-loading-overlay"
    );

    const hideDialogByEvent = ({ key, target }) => {
      if (key === "Escape" || (!key && target === overlayElement)) hideDialog();
    };

    document.addEventListener("keydown", hideDialogByEvent);
    overlayElement.addEventListener("click", hideDialogByEvent);

    return () => {
      document.removeEventListener("keydown", hideDialogByEvent);
      overlayElement.removeEventListener("click", hideDialogByEvent);
    };
  });

  return (
    <div
      ref={dialog}
      className={`react-file-viewer-dialog file-type-${fileType}`}
    >
      <FileViewer fileType={fileType} filePath={filePath} />
    </div>
  );
}
