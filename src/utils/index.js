export const buildFileList = function(files) {
  let adapter = new ClipboardEvent("").clipboardData || new DataTransfer();
  files.forEach((file) => adapter.items.add(file));
  return adapter.files;
};
