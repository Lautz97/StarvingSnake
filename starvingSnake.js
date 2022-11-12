let gridSize = (tileCount = 20)

let pause = false

let snake = { x: 10, y: 10 }

let food = { x: 15, y: 15 }
let lastVelocity = { x: 0, y: 0 }
let snakeVelocity = { x: 0, y: 0 }

let trail = []
let minTail = 5
let tailLen = minTail

let minGameSpeed = 7000
let maxGameSpeed = 500
let gameSpeed = minGameSpeed
let deltaSpeed = -500 // must be negative

function keyPush(evt) {
	// console.log(evt.keyCode)
	switch (evt.keyCode) {
		case 32:
			if (!pause) {
				lastVelocity.x = snakeVelocity.x
				lastVelocity.y = snakeVelocity.y
				snakeVelocity.x = 0
				snakeVelocity.y = 0
				pause = true
			} else if (pause) {
				pause = false
				snakeVelocity.x = lastVelocity.x
				snakeVelocity.y = lastVelocity.y
			}
			break
		case 37: // sx
			if (snakeVelocity.x != 1 && !pause) {
				snakeVelocity.x = -1
				snakeVelocity.y = 0
			}
			break
		case 39: //dx
			if (snakeVelocity.x != -1 && !pause) {
				snakeVelocity.x = 1
				snakeVelocity.y = 0
			}
			break
		case 38: //up
			if (snakeVelocity.y != 1 && !pause) {
				snakeVelocity.x = 0
				snakeVelocity.y = -1
				break
			}
		case 40: //down
			if (snakeVelocity.y != -1 && !pause) {
				snakeVelocity.x = 0
				snakeVelocity.y = 1
				break
			}
	}
}

function mode(direction, pawn) {
	
}

window.onload = function () {
	canv = document.getElementById("gc")
	ctx = canv.getContext("2d")
	document.addEventListener("keydown", keyPush)
	game()
}

function game() {
	snake.x += snakeVelocity.x
	snake.y += snakeVelocity.y

	if (snake.x < 0) {
		snake.x = tileCount - 1
	}
	if (snake.x > tileCount - 1) {
		snake.x = 0
	}

	if (snake.y < 0) {
		snake.y = tileCount - 1
	}
	if (snake.y > tileCount - 1) {
		snake.y = 0
	}

	if (snakeVelocity.x != 0 || snakeVelocity.y != 0 || trail.length == 0) {
		trail.push({ x: snake.x, y: snake.y })
	}

	draw()

	checkSelfBite()

	checkFoodIntake()

	while (trail.length > tailLen) {
		trail.shift()
	}
	setTimeout(game, gameSpeed / 15)
}

function checkFoodIntake() {
	if (food.x == snake.x && food.y == snake.y) {
		tailLen += 1
		food.x = Math.floor(Math.random() * tileCount)
		food.y = Math.floor(Math.random() * tileCount)
		updateGameSpeed()
	}
}

function checkSelfBite() {
	for (let i = 2; i < trail.length - 2; i++) {
		if (trail[i].x == snake.x && trail[i].y == snake.y) {
			tailLen = trail.length - i
			updateGameSpeed()
		}
	}
}

function updateGameSpeed() {
	deltaTailSpeed = (tailLen - minTail) * deltaSpeed
	gameSpeed = minGameSpeed + deltaTailSpeed
	if (gameSpeed < maxGameSpeed) gameSpeed = maxGameSpeed
	if (gameSpeed > minGameSpeed) gameSpeed = minGameSpeed
}

function draw() {
	// drawBg()
	drawBgGradient()

	drawFood()

	drawSnake()
}

function drawBg() {
	ctx.fillStyle = "black" //bg is black
	ctx.fillRect(0, 0, canv.width, canv.height)
}

colorsGameLoop = ["#357a47", "#104a1f", "#003d10"]
colorsPause = ["#263b52", "#19406b", "#5997d9"]
colors = []

function drawBgGradient() {
	// Create gradient
	if (pause) colors = colorsPause
	else if (!pause) colors = colorsGameLoop

	grd = ctx.createRadialGradient(canv.width / 2, canv.height / 2, 0, canv.width / 2, canv.height / 2, 200)
	grd.addColorStop(0, colors[0])
	grd.addColorStop(0.75, colors[1])
	grd.addColorStop(1, colors[2])

	// Fill with gradient
	ctx.fillStyle = grd
	ctx.fillRect(0, 0, canv.width, canv.height)
}

function drawFood() {
	ctx.fillStyle = "red" //food is red
	ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize - 2, gridSize - 2)
}

function drawSnake() {
	ctx.fillStyle = "lime" //snake is lime
	for (let i = 0; i < trail.length; i++) {
		ctx.fillRect(trail[i].x * gridSize, trail[i].y * gridSize, gridSize - 2, gridSize - 2)
	}
}
