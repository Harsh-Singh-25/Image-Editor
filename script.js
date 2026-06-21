let filters = {
  brightness: {
    value: 100,
    min: 0,
    max: 200,
    unit: "%",
  },
  contrast: {
    value: 100,
    min: 0,
    max: 200,
    unit: "%",
  },
  saturation: {
    value: 100,
    min: 0,
    max: 200,
    unit: "%",
  },
  huerotation: {
    value: 0,
    min: 0,
    max: 360,
    unit: "deg",
  },
  blur: {
    value: 0,
    min: 0,
    max: 20,
    unit: "px",
  },
  opacity: {
    value: 100,
    min: 0,
    max: 360,
    unit: "%",
  }, // default to fully visible
  grayscale: { value: 0, min: 0, max: 100, unit: "%" },
  sepia: {
    value: 0,
    min: 0,
    max: 100,
    unit: "%",
  },
  invert: {
    value: 0,
    min: 0,
    max: 100,
    unit: "%",
  },
};
const presets = {
  normal: {
    brightness: 100,
    contrast: 100,
    saturation: 100,
    huerotation: 0,
    blur: 0,
    grayscale: 0,
    sepia: 0,
    invert: 0,
    opacity: 100,
  },

  vintage: {
    brightness: 110,
    contrast: 120,
    saturation: 80,
    huerotation: 10,
    blur: 0,
    grayscale: 10,
    sepia: 40,
    invert: 0,
    opacity: 100,
  },

  blackWhite: {
    brightness: 100,
    contrast: 120,
    saturation: 0,
    huerotation: 0,
    blur: 0,
    grayscale: 100,
    sepia: 0,
    invert: 0,
    opacity: 100,
  },

  cool: {
    brightness: 105,
    contrast: 110,
    saturation: 130,
    huerotation: 20,
    blur: 0,
    grayscale: 0,
    sepia: 0,
    invert: 0,
    opacity: 100,
  },

  warm: {
    brightness: 110,
    contrast: 105,
    saturation: 120,
    huerotation: -20,
    blur: 0,
    grayscale: 0,
    sepia: 20,
    invert: 0,
    opacity: 100,
  },

  dramatic: {
    brightness: 90,
    contrast: 180,
    saturation: 130,
    huerotation: 0,
    blur: 0,
    grayscale: 0,
    sepia: 0,
    invert: 0,
    opacity: 100,
  },

  faded: {
    brightness: 115,
    contrast: 70,
    saturation: 70,
    huerotation: 0,
    blur: 1,
    grayscale: 10,
    sepia: 15,
    invert: 0,
    opacity: 100,
  },

  cyberpunk: {
    brightness: 110,
    contrast: 170,
    saturation: 180,
    huerotation: 60,
    blur: 0,
    grayscale: 0,
    sepia: 0,
    invert: 0,
    opacity: 100,
  }
};
function applyPreset(presetName) {
  const preset = presets[presetName];

  Object.keys(preset).forEach((key) => {
    filters[key].value = preset[key];

    const slider = document.getElementById(key);
    if (slider) {
      slider.value = preset[key];
    }
  });

  applyFilters();
}
document.querySelectorAll(".preset-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    applyPreset(btn.dataset.preset);
  });
});

const imageCanvas = document.querySelector("#image-canvas");
const resetButton = document.querySelector("#reset-btn");
const downloadButton = document.querySelector("#download-btn");
const imgInput = document.querySelector("#image-input");
const canvasCtx = imageCanvas.getContext("2d");
let file = null;
let image = null;

const filtersCounter = document.querySelector(".filters");

function createFilterElement(name, unit = "%", min, max, value) {
  const div = document.createElement("div");
  div.classList.add("filter");

  const input = document.createElement("input");
  input.type = "range";
  input.min = min;
  input.max = max;
  input.value = value;
  input.id = name;

  const p = document.createElement("p");
  p.innerText = name;

  div.appendChild(p);
  div.appendChild(input);

  input.addEventListener("input", (event) => {
    filters[name].value = input.value;
    applyFilters();
  });

  return div;
}

function createFilters(){
    Object.keys(filters).forEach((key) => {
  const filterElement = createFilterElement(
    key,
    filters[key].unit,
    filters[key].min,
    filters[key].max,
    filters[key].value,
  );

  filtersCounter.appendChild(filterElement);
});

}
createFilters()
imgInput.addEventListener("change", (event) => {
  const file = event.target.files[0];
  const imgPlaceHolder = document.querySelector(".placeholder");
  imgPlaceHolder.style.display = "none";

  const img = new Image();
  img.src = URL.createObjectURL(file);

  img.onload = () => {
    image = img;
    imageCanvas.width = img.width;
    imageCanvas.height = img.height;
    canvasCtx.drawImage(img, 0, 0);
  };
});

function applyFilters() {
  canvasCtx.clearRect(0, 0, imageCanvas.width, imageCanvas.height);

  const blurValue = Number(filters.blur.value);

  canvasCtx.filter = `
        brightness(${filters.brightness.value}${filters.brightness.unit})
        contrast(${filters.contrast.value}${filters.contrast.unit})
        saturate(${filters.saturation.value}${filters.saturation.unit})
        hue-rotate(${filters.huerotation.value}${filters.huerotation.unit})
        blur(${filters.blur.value}${filters.blur.unit})
        grayscale(${filters.grayscale.value}${filters.grayscale.unit})
        sepia(${filters.sepia.value}${filters.sepia.unit})
        opacity(${filters.opacity.value}${filters.opacity.unit})
        invert(${filters.invert.value}${filters.invert.unit})
    `;

  // ✅ Draw image inset by blur amount so edges don't get clipped
  canvasCtx.drawImage(
    image,
    blurValue, // dx - push right
    blurValue, // dy - push down
    imageCanvas.width - blurValue * 2, // shrink width
    imageCanvas.height - blurValue * 2, // shrink height
  );
}

resetButton.addEventListener("click", () => {
    filters = {
  brightness: {
    value: 100,
    min: 0,
    max: 200,
    unit: "%",
  },
  contrast: {
    value: 100,
    min: 0,
    max: 200,
    unit: "%",
  },
  saturation: {
    value: 100,
    min: 0,
    max: 200,
    unit: "%",
  },
  huerotation: {
    value: 0,
    min: 0,
    max: 360,
    unit: "deg",
  },
  blur: {
    value: 0,
    min: 0,
    max: 20,
    unit: "px",
  },
  opacity: {
    value: 100,
    min: 0,
    max: 360,
    unit: "%",
  }, 
  grayscale: { 
    value: 0,
     min: 0, 
     max: 100, 
     unit: "%"
     },
  sepia: {
    value: 0,
    min: 0,
    max: 100,
    unit: "%",
  },
  invert: {
    value: 0,
    min: 0,
    max: 100,
    unit: "%",
  },
    }
    applyFilters()
    filtersCounter.innerHTML = ""
    createFilters()
})
downloadButton.addEventListener("click", () => {
  const link = document.createElement("a")
  link.download = "edited-images.png"
  link.href =  imageCanvas.toDataURL()
  link.click()
})