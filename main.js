let saturate = document.getElementById("saturate");
let contrast = document.getElementById("contrast");
let brightness = document.getElementById("brightness");
let sepia = document.getElementById("sepia");
let grayscale = document.getElementById("grayscale");
let blur = document.getElementById("blur");
let hueRotate = document.getElementById("hue-rotate");
const inputs = document.querySelectorAll("input[type='range']");

let upload = document.getElementById("upload");
let download = document.getElementById("download");
let img = document.getElementById("img");
let reset = document.querySelector("span");
let imgBox = document.querySelector(".img-box");

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const toggleDisabled = () => {
  inputs.forEach((input) => {
    input.disabled = !input.disabled;
  });
};

const addFilters = function () {
  ctx.filter = `
  saturate(${saturate.value}%)
  contrast(${contrast.value}%)
  brightness(${brightness.value}%)
  sepia(${sepia.value}%)
  grayscale(${grayscale.value})
  blur(${blur.value}px)
  hue-rotate(${hueRotate.value}deg)
  `;
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
};

function resetValue() {
  img.style.filter = "none";
  saturate.value = "100";
  contrast.value = "100";
  brightness.value = "100";
  sepia.value = "0";
  grayscale.value = "0";
  blur.value = "0";
  hueRotate.value = "0";
  addFilters();
}

window.onload = function () {
  download.style.display = "none";
  reset.style.display = "none";
  imgBox.style.display = "none";
  toggleDisabled();
};

upload.onchange = function () {
  resetValue();
  download.style.display = "block";
  reset.style.display = "block";
  imgBox.style.display = "block";
  toggleDisabled();

  let file = new FileReader();
  file.readAsDataURL(upload.files[0]);
  file.onload = function () {
    img.src = file.result;
  };
};

img.onload = function () {
  canvas.width = img.width;
  canvas.height = img.height;
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  img.style.display = "none";
};

inputs.forEach((filter) => {
  filter.addEventListener("input", addFilters);
});

download.onclick = function () {
  download.href = canvas.toDataURL("image/jpg");
};
reset.addEventListener("click", resetValue);
