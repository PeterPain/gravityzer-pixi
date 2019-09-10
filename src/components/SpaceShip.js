import * as PIXI from 'pixi.js';
import Attractor from './Attractor';
import Vector2D from './Vector2D';
import TrailPNG from '../assets/trail.png';

class SpaceShip extends Attractor {
	constructor(app, posX, posY) {
		super(posX, posY, 100, false, 0);
		this.angle = 0;
		this.vrot = 0;

		this.thrust = 0;

		const shipGraphics = new PIXI.Graphics();
		shipGraphics.beginFill(0xffffff);

		// Draw a ship
		shipGraphics.lineTo(40, 15);
		shipGraphics.lineTo(0, 30);
		shipGraphics.lineTo(0, 0);
		shipGraphics.endFill();

		const t = app.renderer.generateTexture(shipGraphics, 1, 2);
		this.pixi = new PIXI.Sprite(t);

		this.pixi.x = this.pos.x;
		this.pixi.y = this.pos.y;
		this.pixi.anchor.set(0.5);
		app.stage.addChild(this.pixi);

		// Get the texture for rope.
		const trailTexture = PIXI.Texture.from(TrailPNG);
		this.history = [];
		// historySize determines how long the trail will be.
		this.historySize = 50;

		// Create history array.
		for (let i = 0; i < this.historySize; i += 1) {
			this.history.push(new PIXI.Point(this.pos.x, this.pos.y));
		}

		// Create the rope
		const rope = new PIXI.SimpleRope(trailTexture, this.history);

		// Set the blendmode
		rope.blendmode = PIXI.BLEND_MODES.ADD;

		app.stage.addChild(rope);
	}

	update() {
		this.angle += this.vrot;

		if (this.thrust !== 0) {
			this.acc.add(
				Vector2D.mult(new Vector2D(1, 0).rotate(this.angle), this.thrust)
			);
		}

		super.update();

		// update graphics
		this.pixi.x = this.pos.x;
		this.pixi.y = this.pos.y;
		this.pixi.angle = this.angle;

		this.history.pop();
		this.history.unshift(new PIXI.Point(this.pos.x, this.pos.y));
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
