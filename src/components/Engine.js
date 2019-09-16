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
		this.objects = [];
		this.stats = new Stats();
		this.stats.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom

		document.body.appendChild(this.app.view);
		document.body.appendChild(this.stats.dom);

		this.gravSys = new GravitySystem();
	}

	addGraphics(g) {
		if (Array.isArray(g)) {
			g.forEach(graphics => {
				this.app.stage.addChild(graphics);
			});
		} else {
			this.app.stage.addChild(g);
		}
	}

	addParticle(pos, spd, mass, config, historySize) {
		this.addObject(new Particle(pos, spd, mass, config, historySize));
	}

	addObject(o) {
		this.objects.push(o);
		this.addGraphics(o.graphics);
	}

	start() {
		this.app.ticker.add(() => this.update());
	}

	update() {
		this.stats.begin();

		const toMerge = this.gravSys.update(this.objects);

		this.bounce();

		if (toMerge.length > 0) {
			this.objects[toMerge[0]].disable();
			this.objects[toMerge[1]].disable();
			const mTotal =
				this.objects[toMerge[0]].physics.m + this.objects[toMerge[1]].physics.m;
			this.objects[toMerge[0]] = new Particle(
				this.objects[toMerge[0]].physics.pos.clone(),
				this.objects[toMerge[0]].physics.spd.clone(),
				mTotal
			);
			this.addGraphics(this.objects[toMerge[0]].graphics);

			this.objects.splice(toMerge[1], 1);
		}

		this.objects.forEach(o => {
			o.render();
		});

		// this.gravSys.render();

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
		this.addObject(player);
		fun(this);
	}

	bounce() {
		this.objects.forEach(member => {
			member.physics.bounce(this.w, this.h);
		});
	}
}

export default Engine;
