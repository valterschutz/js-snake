// Constants, sizes in pixels
const boxSize = 50
const nrOfBoxes = 10  // For one direction only, so grid contains nrOfBoxes^2 boxes

// Elements
const grid = document.getElementById("grid")

// Set size of grid and populate with boxes
grid.style.width = `${nrOfBoxes * boxSize}px`
grid.style.height = `${nrOfBoxes * boxSize}px`
for (let i = 0; i < nrOfBoxes * nrOfBoxes; i++) {
    let box = document.createElement("div")
    box.classList.add("box")
    box.style.width = `${boxSize}px`
    box.style.height = `${boxSize}px`
    grid.appendChild(box)
}