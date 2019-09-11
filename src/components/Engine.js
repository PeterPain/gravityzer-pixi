import * as PIXI from 'pixi.js';
import Stats from 'stats.js';
import GravitySystem from './GravitySystem';
import MouseHandler from './MouseHandler';

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

		// const ship = new SpaceShip(app, new Vector2D(200, 200));
		// gravSys.add(ship);

		// this.app.ticker.add(delta => this.gameLoop(delta));
	}

	addGraphics(g) {
		this.app.stage.addChild(g);
	}

	addParticle(pos, spd, mass, isStatic, polarity, historySize) {
		this.gravSys.add(
			new Particle(this, pos, spd, mass, isStatic, polarity, historySize)
		);
	}

	update() {
		this.stats.begin();

		this.mouseHandler.update();
		this.gravSys.update(this.frmCnt);
		this.stats.end();
		this.frmCnt += 1;
	}
}

export default Engine;
