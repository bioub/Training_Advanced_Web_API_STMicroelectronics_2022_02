self.importScripts("./node_modules/libheif-js/libheif/libheif.js");
self.importScripts("./node_modules/jpeg-js/lib/encoder.js");
self.importScripts("./convert-heic-to-jpeg.js");

self.onmessage = async (event) => {
  const arrayBuffer = event.data;

  const result = await convertHeicToJpeg(arrayBuffer);
  
  self.postMessage(result)
};
