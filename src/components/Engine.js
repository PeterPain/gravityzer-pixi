import * as PIXI from 'pixi.js';
import Stats from 'stats.js';
import GravitySystem from './GravitySystem';
import MouseSpawner from './MouseSpawner';
import SpaceShip from './SpaceShip';
import Player from './Player';

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

		// this.mouseSpawner = new MouseSpawner(this);
	}

	addGraphics(g) {
		this.app.stage.addChild(g);
	}

	addParticle(pos, spd, mass, config, historySize) {
		this.gravSys.add(new Particle(this, pos, spd, mass, config, historySize));
	}

	start() {
		this.app.ticker.add(delta => this.update(delta));
	}

	update(delta) {
		this.stats.begin();

		// this.mouseSpawner.update();
		this.gravSys.update(this.frmCnt);

		this.stats.end();
		this.frmCnt += 1;
	}

	loadStage(fun) {
		this.gravSys = new GravitySystem();
		this.app.stage = new PIXI.Container();
		const player = new Player(this);
		this.gravSys.add(player);
		fun(this);
	}
}

export default Engine;
