m = document.getElementById("life").getContext("2d")

attract = 1
repulse = -1

canvasH = 500
canvasW = 1000

timeScaleFactor = 0.005
maxForce = 60

limitToBorders = true

draw = (x, y, c, s) => {
	m.fillStyle = c
	m.fillRect(x, y, s, s)
}

particles = []

particle = (x, y, c) => {
	return { x: x, y: y, vx: 0, vy: 0, color: c }
}

random = () => {
	return Math.random() * 400 + 50
}

randomX = () => {
	return Math.random() * (canvasW - 100) + 50
}

randomY = () => {
	return Math.random() * (canvasH - 100) + 50
}

create = (number, color) => {
	group = []
	for (let i = 0; i < number; i++) {
		group.push(particle(randomX(), randomY(), color))
		particles.push(group[i])
	}
	return group
}

rule = (particle1, particle2, g, m = 1) => {
	for (let i = 0; i < particle1.length; i++) {
		fx = 0
		fy = 0
		for (let j = 0; j < particle2.length; j++) {
			a = particle1[i]
			b = particle2[j]

			dx = a.x - b.x
			dy = a.y - b.y

			d = Math.sqrt(dx * dx + dy * dy)

			if (d > 0 && d < maxForce) {
				F = (g * m) / d
				fx += F * dx
				fy += F * dy
			}

			a.vx = (a.vx + fx) * timeScaleFactor
			a.x += a.vx

			a.vy = (a.vy + fy) * timeScaleFactor
			a.y += a.vy

			if (limitToBorders) {
				if (a.x <= 0 || a.x >= canvasW) {
					a.vx *= -1
				}
				if (a.y <= 0 || a.y >= canvasH) {
					a.vy *= -1
				}
			}
		}
	}
}

yellow = create(1000, "yellow")
red = create(1000, "red")
// green = create(1000, "green")

useRulesNucleusAndMembrane = () => {
	rule(red, red, -0.1)
	rule(red, yellow, -0.01)
	rule(yellow, red, 0.01)
}

useRulesNucleusAndMembraneWithIntermediateStates = () => {
	rule(red, red, 0.1)
	rule(yellow, red, 0.15)
	rule(green, green, -0.7)
	rule(green, red, -0.2)
	rule(red, green, -0.1)
}

useRulesFish = () => {
	rule(green, green, -0.32)
	rule(green, red, -0.17)
	rule(green, yellow, 0.34)
	rule(red, red, -0.1)
	rule(red, green, -0.2)
	rule(yellow, yellow, 0.15)
	rule(yellow, green, -0.2)
}

update = () => {
	useRulesNucleusAndMembrane()
	m.clearRect(0, 0, 1000, 500)
	draw(0, 0, "black", 1000)
	for (let i = 0; i < particles.length; i++) {
		draw(particles[i].x, particles[i].y, particles[i].color, 5)
	}
}

setInterval(update, 1200 / 60)
