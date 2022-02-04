async function convertHeicToJpeg(arrayBuffer) {
  const decoder = new libheif.HeifDecoder();
  const data = decoder.decode(arrayBuffer);

  if (!data.length) {
    throw new Error("HEIF image not found");
  }

  const image = data[0];
  const width = image.get_width();
  const height = image.get_height();

  const imageData = new ImageData(width, height);
  
  await new Promise((resolve, reject) => {
    image.display(imageData, (displayData) => {
      if (!displayData) {
        return reject(new Error("HEIF processing error"));
      }

      // get the ArrayBuffer from the Uint8Array
      resolve(displayData.data.buffer);
    });
  });

  return encode(imageData, 80);
}