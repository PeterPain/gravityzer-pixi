import * as PIXI from 'pixi.js';
import Attractor from './Attractor';
import TrailPNG from '../assets/trail2.png';
import EngineObject from './EngineObject';

const colors = [0xff5555, 0x55ff55, 0x7777ff, 0xffff55, 0xffaa00];

class Particle extends EngineObject {
	constructor(
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

		const circle = new PIXI.Graphics();
		circle.lineStyle(1, edgeCol);
		circle.beginFill(fillCol);
		circle.drawCircle(0, 0, Math.sqrt(mass / 10));
		circle.endFill();

		// init trail
		const history = [];
		const scale = Math.sqrt(mass / 10) / 5;
		for (let i = 0; i < historySize; i += 1) {
			history.push(new PIXI.Point(pos.x / scale, pos.y / scale));
		}
		const rope = new PIXI.SimpleRope(PIXI.Texture.from(TrailPNG), history);
		rope.scale.set(scale);
		rope.tint = fillCol;
		rope.alpha = 0.75;
		rope.blendmode = PIXI.BLEND_MODES.ADD;

		// init gravity
		super(new Attractor(pos, spd, mass, config), [circle, rope]);
		this.scale = scale;
		this.history = history;
	}

	render() {
		// update graphics
		this.graphics[0].x = this.physics.pos.x;
		this.graphics[0].y = this.physics.pos.y;

		this.history.pop();
		this.history.unshift(
			new PIXI.Point(
				this.physics.pos.x / this.scale,
				this.physics.pos.y / this.scale
			)
		);
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
