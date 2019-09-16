import Vector2D from './Vector2D';

class Attractor {
	constructor(pos, spd, mass, config) {
		this.pos = pos;
		this.spd = spd;
		this.acc = new Vector2D(0, 0);
		this.m = mass;
		this.isStatic = config.isStatic;
		this.polarity = config.polarity;
		this.hasGravity = config.hasGravity;
		this.bounceFactor = config.bounceFactor;
	}

	accelerate(v) {
		this.acc.add(v);
	}

	update(dt = 1) {
		this.spd.add(Vector2D.mult(this.acc, dt));
		this.pos.add(Vector2D.mult(this.spd, dt));
		this.acc.mult(0);
	}

	bounce(w, h) {
		// bounce off the sides
		if (this.pos.x < 0) {
			this.pos.x = 0;
			this.spd.x = -this.spd.x;
			this.spd.mult(this.bounceFactor);
		} else if (this.pos.x > w) {
			this.pos.x = w;
			this.spd.x = -this.spd.x;
			this.spd.mult(this.bounceFactor);
		}

		if (this.pos.y < 0) {
			this.pos.y = 0;
			this.spd.y = -this.spd.y;
			this.spd.mult(this.bounceFactor);
		} else if (this.pos.y > h) {
			this.pos.y = h;
			this.spd.y = -this.spd.y;
			this.spd.mult(this.bounceFactor);
		}
	}
}
export default Attractor;
