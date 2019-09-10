import * as PIXI from 'pixi.js';
import Attractor from './Attractor';
import TrailPNG from '../assets/trail.png';
import { get } from 'https';

class Particle extends Attractor {
	constructor(app, posX, posY, mass) {
		// init gravity
		super(posX, posY, mass, false, 0);

		// init graphics
		const col = getRandomColor();
		this.pixi = new PIXI.Graphics();
		this.pixi.beginFill(col);
		this.pixi.drawCircle(0, 0, 5);
		this.pixi.endFill();
		this.pixi.x = this.pos.x;
		this.pixi.y = this.pos.y;
		app.stage.addChild(this.pixi);

		// init trail
		this.history = [];
		this.upd = false;
		this.historySize = 150;
		for (let i = 0; i < this.historySize; i += 1) {
			this.history.push(new PIXI.Point(this.pos.x, this.pos.y));
		}
		const rope = new PIXI.SimpleRope(PIXI.Texture.from(TrailPNG), this.history);
		rope.tint = col;
		rope.alpha = 0.75;
		rope.blendmode = PIXI.BLEND_MODES.ADD;
		app.stage.addChild(rope);
	}

	update(frmCnt) {
		// update gravity forces
		super.update();

		// update graphics
		this.pixi.x = this.pos.x;
		this.pixi.y = this.pos.y;

		if (frmCnt % 2 === 0) {
			this.history.pop();
			this.history.unshift(new PIXI.Point(this.pos.x, this.pos.y));
		}
	}
}

function getRandomColor() {
	var letters = '0123456789ABCDEF';
	var color = '0x';
	for (var i = 0; i < 6; i++) {
		color += letters[Math.floor(Math.random() * 16)];
	}
	return color;
}

export default Particle;
