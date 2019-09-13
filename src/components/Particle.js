import * as PIXI from 'pixi.js';
import Attractor from './Attractor';
import TrailPNG from '../assets/trail2.png';

const colors = [0xff5555, 0x55ff55, 0x7777ff, 0xffff55, 0xffaa00];

class Particle extends Attractor {
	constructor(
		engine,
		pos,
		spd,
		mass,
		config = {
			isStatic: false,
			polarity: 0,
			hasGravity: true,
			bounceFactor: 0.75
		},
		historySize = 100
	) {
		// init gravity
		super(pos, spd, mass, config);

		// init graphics
		let fillCol = getRandomColor();
		let edgeCol = fillCol;
		if (config.polarity === 1) {
			fillCol = 0xffffff;
			edgeCol = 0x000000;
		} else if (config.polarity === -1) {
			fillCol = 0x000000;
			edgeCol = 0xffffff;
		}

		this.pixi = new PIXI.Graphics();
		this.pixi.lineStyle(1, edgeCol);
		this.pixi.beginFill(fillCol);
		this.pixi.drawCircle(0, 0, Math.sqrt(mass / 10));
		this.pixi.endFill();
		this.pixi.x = this.pos.x;
		this.pixi.y = this.pos.y;
		engine.addGraphics(this.pixi);

		// init trail
		this.history = [];
		this.scale = Math.sqrt(mass / 10) / 5;
		for (let i = 0; i < historySize; i += 1) {
			this.history.push(
				new PIXI.Point(this.pos.x / this.scale, this.pos.y / this.scale)
			);
		}
		this.rope = new PIXI.SimpleRope(PIXI.Texture.from(TrailPNG), this.history);
		this.rope.scale.set(this.scale);
		this.rope.tint = fillCol;
		this.rope.alpha = 0.75;
		this.rope.blendmode = PIXI.BLEND_MODES.ADD;
		engine.addGraphics(this.rope);
	}

	render() {
		// update graphics
		this.pixi.x = this.pos.x;
		this.pixi.y = this.pos.y;

		this.history.pop();
		this.history.unshift(
			new PIXI.Point(this.pos.x / this.scale, this.pos.y / this.scale)
		);
	}

	disable() {
		this.pixi.visible = false;
		this.rope.visible = false;
	}
}

function getRandomColor() {
	// const letters = '0123456789ABCDEF';
	// let color = '0x';
	// for (let i = 0; i < 6; i += 1) {
	// 	color += letters[Math.floor(Math.random() * 16)];
	// }
	// return color;
	return colors[Math.floor(Math.random() * colors.length)];
}

export default Particle;
