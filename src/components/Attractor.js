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

	update() {
		this.spd.add(this.acc);
		this.pos.add(this.spd);
		this.acc.mult(0);
	}
}
export default Attractor;
