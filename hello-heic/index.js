/** @type {HTMLInputElement} */
const inputFileEl = document.querySelector(".file");
const resultEl = document.querySelector(".result");
const btnNoWorkerEl = document.querySelector(".without-worker");
const btnWorkerEl = document.querySelector(".with-worker");

class Loader {
  constructor(container) {
    this.container = container;
  }
  start() {
    this.container.innerHTML = "Loading...";
    this._interval = setInterval(() => {
      const matches = this.container.innerHTML.match(/\./g);
      const dots = matches ? ".".repeat((matches.length + 1) % 4) : ".";
      this.container.innerHTML = "Loading" + dots;
    }, 400);
  }
  stop() {
    clearInterval(this._interval);
  }
}

inputFileEl.addEventListener("change", () => {
  resultEl.innerHTML = '';
  btnNoWorkerEl.disabled = false;
  btnWorkerEl.disabled = false;
});

btnNoWorkerEl.addEventListener("click", function (event) {
  const reader = new FileReader();
  const loader = new Loader(resultEl);
  loader.start();

  reader.addEventListener("load", async (event) => {
    const buffer = event.target.result;

    const imageData = await convertHeicToJpeg(buffer);
    loader.stop();
    const blob = new Blob([imageData.data], { type: "image/jpeg" });
    const imageUrl = URL.createObjectURL(blob);

    resultEl.innerHTML = "";
    const imgEl = document.createElement("img");
    imgEl.src = imageUrl;
    imgEl.style.maxWidth = "calc(100vw - 16px)";

    resultEl.appendChild(imgEl);
  });

  reader.readAsArrayBuffer(inputFileEl.files[0]);
});

btnWorkerEl.addEventListener("click", function (event) {
  const reader = new FileReader();
  const loader = new Loader(resultEl);
  loader.start();

  reader.addEventListener("load", (event) => {
    const buffer = event.target.result;

    const worker = new Worker("convert-heic-to-jpeg.worker.js");
    worker.postMessage(buffer);
    worker.onmessage = (event) => {
      worker.terminate();
      loader.stop();

      const imageData = event.data;
      const blob = new Blob([imageData.data], { type: "image/jpeg" });
      const imageUrl = URL.createObjectURL(blob);

      resultEl.innerHTML = "";
      const imgEl = document.createElement("img");
      imgEl.src = imageUrl;
      imgEl.style.maxWidth = "calc(100vw - 16px)";

      resultEl.appendChild(imgEl);
    };
  });

  reader.readAsArrayBuffer(inputFileEl.files[0]);
});
