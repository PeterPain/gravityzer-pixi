import * as PIXI from 'pixi.js';
import Attractor from './Attractor';
import Vector2D from './Vector2D';

import TrailPNG from '../assets/trail.png';
import ShipPNG from '../assets/ship.png';

class SpaceShip extends Attractor {
	constructor(app, posX, posY) {
		// init gravity
		super(posX, posY, 100, false, 0);

		// init angle and thrust
		this.angle = 0;
		this.vrot = 0;
		this.thrust = 0;

		// init ship graphics
		this.pixi = new PIXI.Sprite(PIXI.Texture.from(ShipPNG));
		this.pixi.x = this.pos.x;
		this.pixi.y = this.pos.y;
		this.pixi.anchor.set(0.5);
		this.pixi.scale.set(0.3);
		app.stage.addChild(this.pixi);

		// init trail
		this.history = [];
		this.upd = false;
		this.historySize = 20;
		for (let i = 0; i < this.historySize; i += 1) {
			this.history.push(new PIXI.Point(this.pos.x, this.pos.y));
		}
		const rope = new PIXI.SimpleRope(PIXI.Texture.from(TrailPNG), this.history);
		rope.blendmode = PIXI.BLEND_MODES.ADD;
		app.stage.addChild(rope);
	}

	update() {
		// update angle of ship
		this.angle += this.vrot;

		// add thrust vector
		if (this.thrust !== 0) {
			this.acc.add(
				Vector2D.mult(new Vector2D(1, 0).rotate(this.angle), this.thrust)
			);
		}

		// update gravity forces
		super.update();

		// update graphics
		this.pixi.x = this.pos.x;
		this.pixi.y = this.pos.y;
		this.pixi.angle = this.angle;

		if (this.upd) {
			this.history.pop();
			this.history.unshift(new PIXI.Point(this.pos.x, this.pos.y));
		}
		this.upd = !this.upd;
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
