gridSize = tileCount = 20

player = { x: 10, y: 10 }

food = { x: 15, y: 15 }
snakeVelocity = { x: 0, y: 0 }

trail = []
minTail = 5
tailLen = minTail

minGameSpeed = 7000
maxGameSpeed = 700
gameSpeed = minGameSpeed
deltaSpeed = -300 // must be negative

function keyPush(evt) {
	// console.log(evt.keyCode)
	switch (evt.keyCode) {
		case 32:
			snakeVelocity.x = 0
			snakeVelocity.y = 0
			break
		case 37: // sx
			if (snakeVelocity.x != 1) {
				snakeVelocity.x = -1
				snakeVelocity.y = 0
			}
			break
		case 39: //dx
			if (snakeVelocity.x != -1) {
				snakeVelocity.x = 1
				snakeVelocity.y = 0
			}
			break
		case 38: //up
			if (snakeVelocity.y != 1) {
				snakeVelocity.x = 0
				snakeVelocity.y = -1
				break
			}
		case 40: //down
			if (snakeVelocity.y != -1) {
				snakeVelocity.x = 0
				snakeVelocity.y = 1
				break
			}
	}
}

window.onload = function () {
	canv = document.getElementById("gc")
	ctx = canv.getContext("2d")
	document.addEventListener("keydown", keyPush)
	setInterval(game, gameSpeed / 15)
}

function game() {
	player.x += snakeVelocity.x
	player.y += snakeVelocity.y

	if (player.x < 0) {
		player.x = tileCount - 1
	}
	if (player.x > tileCount - 1) {
		player.x = 0
	}

	if (player.y < 0) {
		player.y = tileCount - 1
	}
	if (player.y > tileCount - 1) {
		player.y = 0
	}

	if (trail.length == 0) {
		trail.push({ x: player.x, y: player.y })
		draw()
	}

	if (snakeVelocity.x != 0 || snakeVelocity.y != 0) {
		trail.push({ x: player.x, y: player.y })
		draw()

		checkSelfBite()

		checkFoodIntake()
	}

	while (trail.length > tailLen) {
		trail.shift()
	}
}

function checkFoodIntake() {
	if (food.x == player.x && food.y == player.y) {
		tailLen += 1
		food.x = Math.floor(Math.random() * tileCount)
		food.y = Math.floor(Math.random() * tileCount)
	}
}

function checkSelfBite() {
	for (let i = 2; i < trail.length - 2; i++) {
		// if (i < trail.length - 2 && trail.length > 2) {
		if (trail[i].x == player.x && trail[i].y == player.y) {
			tailLen = trail.length - i
			updateGameSpeed()
		}
		// }
	}
}

function updateGameSpeed() {
	deltaTailSpeed = tailLen * deltaSpeed
	gameSpeed = minGameSpeed + deltaTailSpeed
	if (gameSpeed > maxGameSpeed) gameSpeed = maxGameSpeed
	if (gameSpeed < minGameSpeed) gameSpeed = minGameSpeed
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

function drawBgGradient() {
	// Create gradient
	grd = ctx.createRadialGradient(canv.width / 2, canv.height / 2, 0, canv.width / 2, canv.height / 2, 200)
	grd.addColorStop(0, "#357a47")
	grd.addColorStop(0.75, "#104a1f")
	grd.addColorStop(1, "#003d10")

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
		// if (i < trail.length - 2 && trail.length > 2) {
		// 	if (trail[i].x == player.x && trail[i].y == player.y) {
		// 		tailLen = trail.length - i
		// 	}
		// }
	}
}
