import React from "react";
import ReactFileViewer from "react-file-viewer";
import MarkdownViewer from "./viewers/MarkdownViewer";

export default class FileViewer extends ReactFileViewer {
  withFetching(Comp) {
    const viewerComp = new ReactFileViewer({ fileType: "csv" }).getDriver();
    const render = viewerComp.prototype.render;

    viewerComp.prototype.render = function() {
      if (this.state.data) {
        return <Comp data={this.state.data} {...this.props} />;
      } else {
        return render.apply(this);
      }
    };

    return viewerComp;
  }

  getDriver() {
    switch (this.props.fileType) {
      case "md": {
        return this.withFetching(MarkdownViewer);
      }
      default: {
        return super.getDriver();
      }
    }
  }
}
