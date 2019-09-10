import Vector2D from './Vector2D';

class Attractor {
	constructor(posX, posY, mass, isStatic, polarity) {
		this.pos = new Vector2D(posX, posY);
		this.spd = new Vector2D(0, 0);
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
