// Constants, sizes in pixels
const boxSize = 50
const nrOfBoxes = 10  // For one direction only, so grid contains nrOfBoxes^2 boxes
const startSpeed = 100
const speedCoef = 1


// Variables
// The snake, represented as an array
let snake
// Position of current apple
let apple
// Array containing boxes, used for easier referencing
let boxes = []
// Direction. 1 = right, -1 = left, 10 = down, -10 = up
let direction
// Score
let score
let timerId
let speed

// Elements
const grid = document.getElementById("grid")
const message = document.getElementById("message")
const startBtn = document.getElementById("start-btn")

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

// Listen for keypresses, only allow valid directions
document.addEventListener("keydown", function (e) {
    switch (e.key) {
        case "ArrowRight":
            if (direction !== -1) {
                direction = 1
            }
            break
        case "ArrowLeft":
            if (direction !== 1) {
                direction = -1
            }
            break
        case "ArrowUp":
            if (direction !== 10) {
                direction = -10
            }
            break
        case "ArrowDown":
            if (direction !== -10) {
                direction = 10
            }
            break
    }
})

// Start game if button pressed
startBtn.addEventListener("click", function () {
    initialize()
    clearInterval(timerId)
    timerId = setInterval(gameLoop, speed);
})

// Functions

// Called when game is started/restarted
function initialize() {
    clearBoard()

    snake = [11, 12, 13]
    direction = 1
    score = 0
    // Speed in ms, smaller value means faster
    speed = startSpeed
    message.textContent = `Score: 0`
    newApple()
    drawSnake()
}

// Remove snake and apples from board
function clearBoard() {
    boxes.forEach(function (box) {
        box.classList.remove("apple")
        box.classList.remove("snake")
    })
}

function drawSnake() {
    snake.forEach(index => { boxes[index].classList.add("snake") })
}

function undrawSnake() {
    snake.forEach(index => { boxes[index].classList.remove("snake") })
}

// Return false if player lost
function moveSnake() {
    // Check if movement is allowed, i.e check if head is on border of grid and check if snake bites itself
    const head = snake[snake.length - 1]
    const newHead = snake[snake.length - 1] + direction
    if (head % 10 === 0 && direction === -1 ||  // Left
        head % 10 === 9 && direction === 1 ||  // Right
        head - 10 < 0 && direction === -10 ||  // Up
        head + 10 >= 100 && direction === 10 ||  // Down
        boxes[newHead].classList.contains("snake")  // Snake bit its tail
    ) {
        return false
    } else {
        // We can now assume that the next box is "safe"
        undrawSnake()
        snake.push(newHead)
        if (checkForApple()) {
            console.log("Apple touched")
            incrementScore()
            newApple()
            // snake.shift()

        } else {
            snake.shift()
        }
        drawSnake()
        return true
    }

}

function drawApple() {
    if (apple) {
        boxes[apple].classList.add("apple")
    }

}

function undrawApple() {
    if (apple) {
        boxes[apple].classList.remove("apple")
    }
}

// Place new apple. Undraws old one and draws the new one.
function newApple() {
    undrawApple()
    apple = Math.floor(Math.random() * nrOfBoxes * nrOfBoxes)
    drawApple()
}

// Return true if apple touches any part of snake
function checkForApple() {
    snake.forEach(snakePart => {
        if (boxes[snakePart].classList.contains("apple")) {
            return true
        }
    })
    console.log("checkForApple fails")
    return false
}

function incrementScore() {
    score++
    message.textContent = `Score: ${score}`
    speed *= speedCoef
    clearInterval(timerId)
    timerId = setInterval(gameLoop, speed);
}

// Main game loop
function gameLoop() {
    // Move snake and if player lost...
    if (!moveSnake()) {
        message.textContent = `You lost! Score was ${score}`
        clearBoard()
        clearInterval(timerId)
        // Player has to click button to start again
    }
}