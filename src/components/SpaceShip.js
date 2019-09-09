import * as PIXI from 'pixi.js';
import Vector2D from './Vector2D';

class SpaceShip {
	constructor(app, posX, posY) {
		this.mass = 1000;
		this.pos = new Vector2D(posX, posY);
		this.angle = 0;
		this.vel = new Vector2D(0, 0);
		this.vrot = 0;

		this.thrust = 0;

		this.acc = new Vector2D(0, 0);

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
		this.pixi.anchor.x = 0.5;
		this.pixi.anchor.y = 0.5;
		app.stage.addChild(this.pixi);
	}

	update() {
		this.angle += this.vrot;

		if (this.acc.length() > 0 || this.thrust > 0) {
			this.acc = new Vector2D(this.thrust, 0).rotate(this.angle);
			this.vel = this.vel.add(this.acc);
		}

		this.pos = this.pos.add(this.vel);

		this.pixi.x = this.pos.x;
		this.pixi.y = this.pos.y;
		this.pixi.angle = this.angle;
	}
}

export default SpaceShip;
