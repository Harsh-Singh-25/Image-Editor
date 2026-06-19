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
    exposue:  {
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
    Blur:  {
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

    return div
}

Object.keys(filters).forEach(key => {
    const filterElement = createFilterElement(key, filters[ key ].unit, filters[ key ].min, filters[ key ].max, filters[ key ].value)

    filtersCounter.appendChild(filterElement)
})