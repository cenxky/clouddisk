import React from "react";
import ReactFileViewer from "react-file-viewer";
import TextFileViewer from "./viewers/TextFileViewer";

export default class FileViewer extends ReactFileViewer {
  withFetching(Comp, defaultProps) {
    const viewerComp = new ReactFileViewer({ fileType: "csv" }).getDriver();
    const render = viewerComp.prototype.render;

    viewerComp.prototype.render = function() {
      if (this.state.data) {
        const newProps = { ...defaultProps, ...this.props };
        return <Comp data={this.state.data} {...newProps} />;
      } else {
        return render.apply(this);
      }
    };

    return viewerComp;
  }

  getDriver() {
    const { fileTypeName } = this.props;

    if (fileTypeName) {
      return this.withFetching(TextFileViewer, { language: fileTypeName });
    } else {
      return super.getDriver();
    }
  }
}
