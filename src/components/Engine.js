import * as PIXI from 'pixi.js';
import Stats from 'stats.js';
import GravitySystem from './GravitySystem';
import MouseHandler from './MouseHandler';
import SpaceShip from './SpaceShip';

import Particle from './Particle';

class Engine {
	constructor(width, height) {
		this.app = new PIXI.Application({
			width,
			height,
			antialias: true // default: false
		});
		this.stats = new Stats();
		this.stats.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom

		this.frmCnt = 0;

		document.body.appendChild(this.app.view);
		document.body.appendChild(this.stats.dom);

		this.gravSys = new GravitySystem();

		this.mouseHandler = new MouseHandler(this);

		//
	}

	addGraphics(g) {
		this.app.stage.addChild(g);
	}

	addParticle(pos, spd, mass, isStatic, polarity, historySize) {
		this.gravSys.add(
			new Particle(this, pos, spd, mass, isStatic, polarity, historySize)
		);
	}

	start() {
		this.app.ticker.add(delta => this.update(delta));
	}

	update(delta) {
		this.stats.begin();

		this.mouseHandler.update();
		this.gravSys.update(this.frmCnt);
		this.stats.end();
		this.frmCnt += 1;
	}

	loadStage(fun) {
		this.gravSys = new GravitySystem();
		this.app.stage = new PIXI.Container();
		const ship = new SpaceShip(this);
		this.gravSys.add(ship);
		fun(this);
	}
}

export default Engine;
