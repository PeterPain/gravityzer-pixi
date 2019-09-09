import * as PIXI from 'pixi.js';
import SpaceShip from './components/SpaceShip';
import GravitySystem from './components/GravitySystem';
import './main.css';

const app = new PIXI.Application({
	width: 1000, // default: 800
	height: 800, // default: 600
	antialias: true // default: false
});

const ship = new SpaceShip(app, 200, 200);
const gravSys = new GravitySystem();
gravSys.add(ship);

initControls();

// The application will create a canvas element for you that you
// can then insert into the DOM
document.body.appendChild(app.view);

app.ticker.add(delta => gameLoop(delta));

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

function initControls() {
	// LEFT RIGHT
	const keyLeft = keyboard('ArrowLeft');
	keyLeft.press = () => {
		ship.vrot = -3;
	};

	const keyRight = keyboard('ArrowRight');
	keyRight.press = () => {
		ship.vrot = 3;
	};

	keyLeft.release = () => {
		if (!keyRight.isDown) ship.vrot = 0;
	};

	keyRight.release = () => {
		if (!keyLeft.isDown) ship.vrot = 0;
	};

	// UP DOWN
	const keyUp = keyboard('ArrowUp');
	keyUp.press = () => {
		ship.thrust = 0.1;
	};

	keyUp.release = () => {
		ship.thrust = 0;
	};
}

function gameLoop(delta) {
	gravSys.update();
}
