const filters = {
    brightness: {
        value: 100,
        min: 0,
        max: 200,
        unit: "%"
    },
    contrast:  {
        value: 100,
        min: 0,
        max: 200,
        unit: "%"
    },
    saturation:  {
        value: 100,
        min: 0,
        max: 200,
        unit: "%"
    },
    huerotation:  {
        value: 100,
        min: 0,
        max: 200,
        unit: "deg"
    },
    blur:  {
        value: 0,
        min: 0,
        max: 360,
        unit: "px"
    },
    grayscale:  {
        value: 0,
        min: 0,
        max: 360,
        unit: "%"
    },
    sepia:  {
        value: 0,
        min: 0,
        max: 360,
        unit: "%"
    },
    opacity:  {
        value: 0,
        min: 0,
        max: 360,
        unit: "%"
    },
    invert:  {
        value: 0,
        min: 0,
        max: 360,
        unit: "%"
    },
}

const imageCanvas = document.querySelector("#image-canvas")
const imgInput = document.querySelector("#image-input")
const canvasCtx = imageCanvas.getContext("2d")
let file = null
let image = null

const filtersCounter = document.querySelector(".filters")

function createFilterElement(name, unit = "%", min, max, value){

    const div = document.createElement("div")
    div.classList.add("filter")

    const input = document.createElement("input")
    input.type = "range"
    input.min = min
    input.max = max
    input.value = value
    input.id = name
    

    const p = document.createElement("p")
    p.innerText = name

    div.appendChild(p)
    div.appendChild(input)

    input.addEventListener("input", (event) => {
        filters[ name ].value =  input.value
        applyFilters()
    })

    return div
}

Object.keys(filters).forEach(key => {
    const filterElement = createFilterElement(key, filters[ key ].unit, filters[ key ].min, filters[ key ].max, filters[ key ].value)

    filtersCounter.appendChild(filterElement)
})

imgInput.addEventListener("change", (event) => {
    const file = event.target.files[0]
    const imgPlaceHolder = document.querySelector(".placeholder")
    imgPlaceHolder.style.display = "none"

    const img = new Image()
    img.src = URL.createObjectURL(file)

    img.onload = () => {
        image = img
        imageCanvas.width = img.width
        imageCanvas.height = img.height
        canvasCtx.drawImage(img, 0 ,0)
    }
})

function applyFilters() {
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
    `
    canvasCtx.drawImage(image, 0, 0)
}