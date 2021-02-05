import React, { useRef } from "react";
import { FileManager, FileNavigator } from "@opuscapita/react-filemanager";
import connectorNodeV1 from "@opuscapita/react-filemanager-connector-node-v1";
import FileViewerDialog from "./FileViewerDialog";
import "./FileManager.scss";

const apiOptions = { ...connectorNodeV1.apiOptions, apiRoot: "/api" };

export default function(props) {
  const helper = useRef({});

  const capabilities = (apiOptions, actions) => {
    helper.current = actions;
    return connectorNodeV1.capabilities(apiOptions, actions);
  };

  const previewFile = ({ rowData }) => {
    const { type, name, id, capabilities: permission } = rowData;
    const { showDialog, hideDialog } = helper.current;

    if (!permission.canDownload || type !== "file" || !showDialog) {
      return;
    }

    const fileLink = `${apiOptions.apiRoot}/download?items=${id}`;
    const fileTypeMatches = name.match(/\.(\w+)$/);
    const fileType = fileTypeMatches ? fileTypeMatches[1] : ".File";

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

  return (
    <FileManager>
      <FileNavigator
        id="clouddisk"
        api={connectorNodeV1.api}
        apiOptions={apiOptions}
        capabilities={capabilities}
        listViewLayout={connectorNodeV1.listViewLayout}
        viewLayoutOptions={connectorNodeV1.viewLayoutOptions}
        onResourceItemDoubleClick={previewFile}
        {...props}
      />
    </FileManager>
  );
}
