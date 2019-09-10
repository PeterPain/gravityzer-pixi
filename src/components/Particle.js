import * as PIXI from 'pixi.js';
import Attractor from './Attractor';

class Particle extends Attractor {
	constructor(app, posX, posY, mass) {
		// init gravity
		super(posX, posY, mass, false, 0);

		// init ship graphics
		this.pixi = new PIXI.Graphics();
		this.pixi.beginFill(0xffffff);
		this.pixi.drawCircle(0, 0, 5);
		this.pixi.endFill();
		this.pixi.x = this.pos.x;
		this.pixi.y = this.pos.y;
		app.stage.addChild(this.pixi);
	}

	update() {
		// update gravity forces
		super.update();

		// update graphics
		this.pixi.x = this.pos.x;
		this.pixi.y = this.pos.y;
	}
}

export default Particle;
