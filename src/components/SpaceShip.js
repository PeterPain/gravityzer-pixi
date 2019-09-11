import * as PIXI from 'pixi.js';
import Attractor from './Attractor';
import Vector2D from './Vector2D';

import TrailPNG from '../assets/trail2.png';
import ShipPNG from '../assets/ship.png';
import KeyHandler from './KeyHandler';

class SpaceShip extends Attractor {
	constructor(engine) {
		// init gravity
		super(new Vector2D(200, 200), new Vector2D(0, 0), 0);

		// init angle and thrust
		this.angle = 0;
		this.vrot = 0;
		this.thrust = 0;
		this.dir = new Vector2D(1, 0);

		// init ship graphics
		this.pixi = new PIXI.Sprite(PIXI.Texture.from(ShipPNG));
		this.pixi.x = this.pos.x;
		this.pixi.y = this.pos.y;
		this.pixi.anchor.set(0.5);
		this.pixi.scale.set(0.3);
		engine.addGraphics(this.pixi);

		// init trail
		this.history = [];
		this.historySize = 200;
		for (let i = 0; i < this.historySize; i += 1) {
			this.history.push(new PIXI.Point(this.pos.x, this.pos.y));
		}
		const rope = new PIXI.SimpleRope(PIXI.Texture.from(TrailPNG), this.history);
		rope.blendmode = PIXI.BLEND_MODES.ADD;
		engine.addGraphics(rope);

		this.initControls();
	}

	update(frmCnt) {
		// update angle of ship
		if (this.vrot !== 0) {
			this.angle += this.vrot;
			this.dir.rotate(this.vrot);
		}

		// add thrust vector
		if (this.thrust !== 0) {
			this.acc.add(Vector2D.mult(this.dir, this.thrust));
		}

		// update gravity forces
		super.update();

		// update graphics
		this.pixi.x = this.pos.x;
		this.pixi.y = this.pos.y;
		this.pixi.angle = this.angle;

		if (frmCnt % 2 === 0) {
			const exhaustPos = Vector2D.add(this.pos, Vector2D.mult(this.dir, -8));
			this.history.pop();
			this.history.unshift(new PIXI.Point(exhaustPos.x, exhaustPos.y));
		}
	}

	initControls() {
		// LEFT RIGHT
		const keyLeft = new KeyHandler('ArrowLeft');
		keyLeft.press = () => {
			this.vrot = -3;
		};

		const keyRight = new KeyHandler('ArrowRight');
		keyRight.press = () => {
			this.vrot = 3;
		};

		keyLeft.release = () => {
			if (!keyRight.isDown) this.vrot = 0;
		};

		keyRight.release = () => {
			if (!keyLeft.isDown) this.vrot = 0;
		};

		// UP DOWN
		const keyUp = new KeyHandler('ArrowUp');
		keyUp.press = () => {
			this.thrust = 0.1;
		};

		keyUp.release = () => {
			this.thrust = 0;
		};
	}
}

// function download_sprite_as_png(renderer, sprite, fileName) {
// 	renderer.extract.canvas(sprite).toBlob(function(b) {
// 		var a = document.createElement('a');
// 		document.body.append(a);
// 		a.download = fileName;
// 		a.href = URL.createObjectURL(b);
// 		a.click();
// 		a.remove();
// 	}, 'image/png');
// }

export default SpaceShip;
