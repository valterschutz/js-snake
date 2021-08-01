// Constants, sizes in pixels
const boxSize = 50
const nrOfBoxes = 10  // For one direction only, so grid contains nrOfBoxes^2 boxes

// The snake, represented as an array
let snake = [11, 12, 13]
// Array containing boxes, used for easier referencing
let boxes = []
// Direction. 1 = right, -1 = left, 10 = down, -10 = up
let direction = 1

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
    boxes.push(box)
}

drawSnake()



// Functions
function drawSnake() {
    snake.forEach(index => { boxes[index].classList.add("snake") })
}

function undrawSnake() {
    snake.forEach(index => { boxes[index].classList.remove("snake") })
}

function moveSnake() {
    undrawSnake()
    snake.push(snake[snake.length - 1] + direction)
    snake.shift()
    drawSnake()
}