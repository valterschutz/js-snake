// Constants, sizes in pixels
const boxSize = 50
const nrOfBoxes = 10  // For one direction only, so grid contains nrOfBoxes^2 boxes


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

// Elements
const grid = document.getElementById("grid")
const scoreEl = document.getElementById("score")
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

// Listen for keypresses
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

startBtn.addEventListener("click", function () {
    initialize()
    clearInterval(timerId)
    timerId = setInterval(gameLoop, 100);
})

// First initialize the game, then start the game loop
// initialize()




// Functions

// Called when game is started/restarted
function initialize() {
    clearBoard()

    snake = [11, 12, 13]
    direction = 1
    score = 0
    scoreEl.textContent = score
    apple = 56
    newApple()
    drawSnake()
    drawApple()
}

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
    // Check if movement is allowed
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
        undrawSnake()
        snake.push(snake[snake.length - 1] + direction)
        if (boxes[newHead].classList.contains("apple")) {
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
    boxes[apple].classList.add("apple")
}

function undrawApple() {
    boxes[apple].classList.remove("apple")
}

function newApple() {
    undrawApple()
    apple = Math.floor(Math.random() * nrOfBoxes * nrOfBoxes)
    drawApple()
}

function checkForApple() {
    const head = snake[snake.length - 1]
    if ("apple" in boxes[head].classList) {

    }
}

function incrementScore() {
    score++
    scoreEl.textContent = score

}

function gameLoop() {
    if (!moveSnake()) {
        console.log("You lost!")
        clearBoard()
    }
    // checkForApple()
}