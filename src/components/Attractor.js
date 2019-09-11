import Vector2D from './Vector2D';

class Attractor {
	constructor(pos, spd, mass, isStatic = false, polarity = 0) {
		this.pos = pos;
		this.spd = spd;
		this.acc = new Vector2D(0, 0);
		this.m = mass;
		this.isStatic = isStatic;
		this.pol = polarity;
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
			this.spd.mult(0.75);
		} else if (this.pos.x > 1500) {
			this.pos.x = 1500;
			this.spd.x = -this.spd.x;
			this.spd.mult(0.75);
		}

		if (this.pos.y < 0) {
			this.pos.y = 0;
			this.spd.y = -this.spd.y;
			this.spd.mult(0.75);
		} else if (this.pos.y > 800) {
			this.pos.y = 800;
			this.spd.y = -this.spd.y;
			this.spd.mult(0.75);
		}
	}
}
export default Attractor;
