import React from "react";
import { FileManager, FileNavigator } from "@opuscapita/react-filemanager";
import connectorNodeV1 from "@opuscapita/react-filemanager-connector-node-v1";
import "./FileManager.scss";

const apiOptions = { ...connectorNodeV1.apiOptions, apiRoot: "/api" };

export default function(props) {
  return (
    <FileManager>
      <FileNavigator
        id="clouddisk"
        api={connectorNodeV1.api}
        apiOptions={apiOptions}
        capabilities={connectorNodeV1.capabilities}
        listViewLayout={connectorNodeV1.listViewLayout}
        viewLayoutOptions={connectorNodeV1.viewLayoutOptions}
        onResourceItemDoubleClick={({ event, number, rowData }) =>
          console.log(event, number, rowData)
        }
        {...props}
      />
    </FileManager>
  );
}
