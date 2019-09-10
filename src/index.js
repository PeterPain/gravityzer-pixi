import * as PIXI from 'pixi.js';
import Stats from 'stats.js';
import SpaceShip from './components/SpaceShip';
import Particle from './components/Particle';
import GravitySystem from './components/GravitySystem';
import KeyHandler from './components/KeyHandler';
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

gravSys.add(new Particle(app, 500, 500, 10));

initControls();

app.ticker.add(delta => gameLoop(delta));

function initControls() {
	// LEFT RIGHT
	const keyLeft = new KeyHandler('ArrowLeft');
	keyLeft.press = () => {
		ship.vrot = -3;
	};

	const keyRight = new KeyHandler('ArrowRight');
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
	const keyUp = new KeyHandler('ArrowUp');
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
	gravSys.update(frmCnt);
	stats.end();
	frmCnt += 1;
}
