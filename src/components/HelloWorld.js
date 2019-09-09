import * as PIXI from 'pixi.js';

const rect = new PIXI.Graphics();
const app = new PIXI.Application({
	width: 1000, // default: 800
	height: 800, // default: 600
	antialias: true // default: false
});

function keyboard(value) {
	const key = {};
	key.value = value;
	key.isDown = false;
	key.isUp = true;
	key.press = undefined;
	key.release = undefined;
	// The `downHandler`
	key.downHandler = event => {
		if (event.key === key.value) {
			if (key.isUp && key.press) key.press();
			key.isDown = true;
			key.isUp = false;
			event.preventDefault();
		}
	};

	// The `upHandler`
	key.upHandler = event => {
		if (event.key === key.value) {
			if (key.isDown && key.release) key.release();
			key.isDown = false;
			key.isUp = true;
			event.preventDefault();
		}
	};

	// Attach event listeners
	const downListener = key.downHandler.bind(key);
	const upListener = key.upHandler.bind(key);

	window.addEventListener('keydown', downListener, false);
	window.addEventListener('keyup', upListener, false);

	// Detach event listeners
	key.unsubscribe = () => {
		window.removeEventListener('keydown', downListener);
		window.removeEventListener('keyup', upListener);
	};

	return key;
}

let sum = 0;

function gameLoop(delta) {
	rect.angle += 4 * delta;
	rect.x += rect.vx;
	sum += 1;
	if (sum % 60 === 0) {
		const dot = new PIXI.Graphics();
		dot.beginFill(0x9b59b6); // Purple
		dot.drawCircle(0, 0, 10);
		dot.endFill();
		dot.x = rect.x;
		dot.y = rect.y;
		app.stage.addChild(dot);
	}
}

function HelloWorld() {
	// The application will create a renderer using WebGL, if possible,
	// with a fallback to a canvas render. It will also setup the ticker
	// and the root stage PIXI.Container

	rect.vx = 0;
	const keyLeft = keyboard('ArrowLeft');
	keyLeft.press = () => {
		rect.vx = -3;
	};

	const keyRight = keyboard('ArrowRight');
	keyRight.press = () => {
		rect.vx = 3;
	};

	keyLeft.release = () => {
		if (!keyRight.isDown) rect.vx = 0;
	};

	keyRight.release = () => {
		if (!keyLeft.isDown) rect.vx = 0;
	};

	// The application will create a canvas element for you that you
	// can then insert into the DOM
	document.body.appendChild(app.view);

	rect.pivot.x = 40;
	rect.pivot.y = 40;
	rect.beginFill(0x9b59b6); // Purple

	// Draw a rectangle
	rect.drawRect(0, 0, 80, 80); // drawRect(x, y, width, height)
	rect.endFill();
	rect.x = 100;
	rect.y = 100;

	app.stage.addChild(rect);

	app.ticker.add(delta => gameLoop(delta));
}

export default HelloWorld;
