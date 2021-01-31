import React from "react";
import FileManager from "../components/FileManager";
import "./App.scss";

export default function() {
  const { pathname } = new URL(window.location.href);
  const filePathMatches = pathname.match(/\/\-(\/.+)/);
  const filePath = filePathMatches && filePathMatches[1].replace(/\/$/, "");
  const initialResourceId = filePath ? btoa(filePath) : "";

  const onResourceLocationChange = (resources) => {
    const filePath = resources
      .slice(1)
      .map((x) => x.name)
      .join("/");

    window.history.replaceState({}, null, filePath ? `/-/${filePath}` : "/");
  };

  return (
    <div className="App">
      <FileManager
        initialResourceId={initialResourceId}
        onResourceLocationChange={onResourceLocationChange}
      />
    </div>
  );
}
