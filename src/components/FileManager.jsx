import React, { useEffect, useRef, useCallback } from "react";
import { FileManager, FileNavigator } from "@opuscapita/react-filemanager";
import connectorNodeV1 from "@opuscapita/react-filemanager-connector-node-v1";
import FileViewerDialog from "./FileViewerDialog";
import { useDropzone } from "react-dropzone";
import { buildFileList } from "../utils";
import "./FileManager.scss";

const apiOptions = { ...connectorNodeV1.apiOptions, apiRoot: "/api" };

export default function(props) {
  const helper = useRef({});

  const setHelperMethods = (ref) => {
    if (!ref) {
      return;
    }

    const navigator = ref.__wrappedComponent;

    helper.current = {
      showDialog: navigator.showDialog,
      hideDialog: navigator.hideDialog,
      toolbar: navigator.state.initializedCapabilities,
    };
  };

  useEffect(() => {
    const addEventListener = HTMLInputElement.prototype.addEventListener;

    HTMLInputElement.prototype.addEventListener = function(...args) {
      const [eventName, callback] = args;

      if (eventName === "change") {
        helper.current.uploadFiles = callback;
      }

      addEventListener(...args);
    };

    return () => {
      HTMLInputElement.prototype.addEventListener = addEventListener;
    };
  });

  const previewFile = ({ rowData }) => {
    const { type, name, id, capabilities: permission } = rowData;
    const { showDialog, hideDialog } = helper.current;

    if (!permission.canDownload || type !== "file" || !showDialog) {
      return;
    }

    const fileLink = `${apiOptions.apiRoot}/download?items=${id}`;
    const fileTypeMatches = name.match(/\.(\w+)$/);
    const fileType = fileTypeMatches ? fileTypeMatches[1] : "File";

    showDialog({
      elementType: "Dialog",
      elementProps: {
        children: (
          <FileViewerDialog
            fileType={fileType}
            filePath={fileLink}
            hideDialog={hideDialog}
          />
        ),
      },
    });
  };

  const onDrop = useCallback((acceptedFiles) => {
    const action = helper.current.toolbar.find((item) => item.id === "upload");

    if (!action) {
      return;
    }

    acceptedFiles.forEach((file) => {
      const inputClick = (event) => {
        const { target } = event;

        if (target.tagName == "INPUT" && target.parentNode === document.body) {
          event.preventDefault();

          target.files = buildFileList([file]);
          helper.current.uploadFiles();

          // Clear input files
          target.value = null;
        }
      };

      document.addEventListener("click", inputClick);

      // Start uploading
      action.handler();

      // Remove inputClick listener
      document.removeEventListener("click", inputClick);
    });
  }, []);

  const { getRootProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()} style={{ height: "100%" }}>
      <FileManager>
        <FileNavigator
          ref={setHelperMethods}
          id="clouddisk"
          api={connectorNodeV1.api}
          apiOptions={apiOptions}
          capabilities={connectorNodeV1.capabilities}
          listViewLayout={connectorNodeV1.listViewLayout}
          viewLayoutOptions={connectorNodeV1.viewLayoutOptions}
          onResourceItemDoubleClick={previewFile}
          {...props}
        />
      </FileManager>
    </div>
  );
}
