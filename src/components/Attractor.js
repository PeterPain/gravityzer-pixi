import Vector2D from './Vector2D';

class Attractor {
	constructor(
		pos,
		spd,
		mass,
		config = {
			isStatic: false,
			polarity: 0,
			hasGravity: true,
			bounceFactor: 0.75
		}
	) {
		this.pos = pos;
		this.spd = spd;
		this.acc = new Vector2D(0, 0);
		this.m = mass;
		this.isStatic = config.isStatic;
		this.pol = config.polarity;
		this.hasGravity = config.hasGravity;
		this.bounceFactor = config.bounceFactor;
	}

	accelerate(v) {
		this.acc.add(v);
	}

	update() {
		this.spd.add(this.acc);
		this.pos.add(this.spd);
		this.acc.mult(0);

		// bounce off the sides
		if (this.pos.x < 0) {
			this.pos.x = 0;
			this.spd.x = -this.spd.x;
			this.spd.mult(this.bounceFactor);
		} else if (this.pos.x > 1500) {
			this.pos.x = 1500;
			this.spd.x = -this.spd.x;
			this.spd.mult(this.bounceFactor);
		}

		if (this.pos.y < 0) {
			this.pos.y = 0;
			this.spd.y = -this.spd.y;
			this.spd.mult(this.bounceFactor);
		} else if (this.pos.y > 800) {
			this.pos.y = 800;
			this.spd.y = -this.spd.y;
			this.spd.mult(this.bounceFactor);
		}
	}
}
export default Attractor;
