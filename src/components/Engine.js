import * as PIXI from 'pixi.js';
import Stats from 'stats.js';
import GravitySystem from './GravitySystem';
import Player from './Player';

import Particle from './Particle';
import Vector2D from './Vector2D';

class Engine {
	constructor(width, height) {
		this.app = new PIXI.Application({
			width,
			height,
			antialias: true // default: false
		});

		this.w = width;
		this.h = height;
		this.stats = new Stats();
		this.stats.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom

		document.body.appendChild(this.app.view);
		document.body.appendChild(this.stats.dom);

		this.gravSys = new GravitySystem();
	}

	addGraphics(g) {
		this.app.stage.addChild(g);
	}

	addParticle(pos, spd, mass, config, historySize) {
		this.gravSys.add(new Particle(this, pos, spd, mass, config, historySize));
	}

	start() {
		this.app.ticker.add(() => this.update());
	}

	update() {
		this.stats.begin();

		this.gravSys.update();

		this.gravSys.bounce(this.w, this.h);

		if (this.gravSys.toMerge.length > 0) {
			this.gravSys.members[this.gravSys.toMerge[0]].disable();
			this.gravSys.members[this.gravSys.toMerge[1]].disable();
			const mTotal =
				this.gravSys.members[this.gravSys.toMerge[0]].m +
				this.gravSys.members[this.gravSys.toMerge[1]].m;
			this.gravSys.members[this.gravSys.toMerge[0]] = new Particle(
				this,
				this.gravSys.members[this.gravSys.toMerge[0]].pos.clone(),
				this.gravSys.members[this.gravSys.toMerge[0]].spd.clone(),
				mTotal
			);

			this.gravSys.members.splice(this.gravSys.toMerge[1], 1);
		}

		this.gravSys.render();

		this.stats.end();
	}

	loadStage(fun) {
		this.gravSys = new GravitySystem();
		this.app.stage = new PIXI.Container();
		const bg = new PIXI.Sprite(PIXI.Texture.WHITE);
		bg.width = this.w;
		bg.height = this.h;
		bg.tint = 0x555566;
		this.addGraphics(bg);

		const player = new Player(this);
		this.gravSys.add(player);
		fun(this);
	}
}

export default Engine;
