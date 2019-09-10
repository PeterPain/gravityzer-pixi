import * as PIXI from 'pixi.js';
import Stats from 'stats.js';
import SpaceShip from './components/SpaceShip';
import Particle from './components/Particle';
import GravitySystem from './components/GravitySystem';
import './main.css';

const stats = new Stats();
stats.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom

let frmCnt = 0;

const app = new PIXI.Application({
	width: 1000, // default: 800
	height: 800, // default: 600
	antialias: true // default: false
});
document.body.appendChild(app.view);
document.body.appendChild(stats.dom);

const gravSys = new GravitySystem();

const ship = new SpaceShip(app, 200, 200);
gravSys.add(ship);

const ship2 = new SpaceShip(app, 600, 600);
gravSys.add(ship2);

gravSys.add(new Particle(app, 500, 500, 50));

initControls();

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
	stats.begin();
	// if (frmCnt % 120 === 0) {
	// 	gravSys.add(new Particle(app, 500, 500, 50));
	// }
	gravSys.update();
	stats.end();
	frmCnt += 1;
}
