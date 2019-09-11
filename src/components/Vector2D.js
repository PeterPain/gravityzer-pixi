/*
Simple 2D JavaScript Vector2D Class
Hacked from evanw's lightgl.js
https://github.com/evanw/lightgl.js/blob/master/src/vector.js
*/

class Vector2D {
	constructor(x, y) {
		this.x = x || 0;
		this.y = y || 0;
	}

	negative() {
		this.x = -this.x;
		this.y = -this.y;
		return this;
	}

	add(v) {
		if (v instanceof Vector2D) {
			this.x += v.x;
			this.y += v.y;
		} else {
			this.x += v;
			this.y += v;
		}
		return this;
	}

	sub(v) {
		if (v instanceof Vector2D) {
			this.x -= v.x;
			this.y -= v.y;
		} else {
			this.x -= v;
			this.y -= v;
		}
		return this;
	}

	mult(v) {
		if (v instanceof Vector2D) {
			this.x *= v.x;
			this.y *= v.y;
		} else {
			this.x *= v;
			this.y *= v;
		}
		return this;
	}

	divide(v) {
		if (v instanceof Vector2D) {
			if (v.x !== 0) this.x /= v.x;
			if (v.y !== 0) this.y /= v.y;
		} else if (v !== 0) {
			this.x /= v;
			this.y /= v;
		}
		return this;
	}

	equals(v) {
		return this.x === v.x && this.y === v.y;
	}

	dot(v) {
		return this.x * v.x + this.y * v.y;
	}

	dist(v) {
		return Vector2D.sub(this, v).length();
	}

	rotate(deg) {
		const theta = (deg * Math.PI) / 180;

		const cs = Math.cos(theta);
		const sn = Math.sin(theta);

		const { x } = this;
		const { y } = this;

		this.x = x * cs - y * sn;
		this.y = x * sn + y * cs;
		return this;
	}

	cross(v) {
		return this.x * v.y - this.y * v.x;
	}

	length() {
		return Math.sqrt(this.dot(this));
	}

	normalize() {
		return this.divide(this.length());
	}

	min() {
		return Math.min(this.x, this.y);
	}

	max() {
		return Math.max(this.x, this.y);
	}

	toAngles() {
		return -Math.atan2(-this.y, this.x);
	}

	angleTo(a) {
		return Math.acos(this.dot(a) / (this.length() * a.length()));
	}

	toArray(n) {
		return [this.x, this.y].slice(0, n || 2);
	}

	clone() {
		return new Vector2D(this.x, this.y);
	}

	set(x, y) {
		this.x = x;
		this.y = y;
		return this;
	}

	static negative(v) {
		return new Vector2D(-v.x, -v.y);
	}

	static add(a, b) {
		if (b instanceof Vector2D) return new Vector2D(a.x + b.x, a.y + b.y);
		return new Vector2D(a.x + b, a.y + b);
	}

	static sub(a, b) {
		if (b instanceof Vector2D) return new Vector2D(a.x - b.x, a.y - b.y);
		return new Vector2D(a.x - b, a.y - b);
	}

	static mult(a, b) {
		if (b instanceof Vector2D) return new Vector2D(a.x * b.x, a.y * b.y);
		return new Vector2D(a.x * b, a.y * b);
	}

	static divide(a, b) {
		if (b instanceof Vector2D) return new Vector2D(a.x / b.x, a.y / b.y);
		return new Vector2D(a.x / b, a.y / b);
	}

	static equals(a, b) {
		return a.x === b.x && a.y === b.y;
	}

	static dot(a, b) {
		return a.x * b.x + a.y * b.y;
	}

	static cross(a, b) {
		return a.x * b.y - a.y * b.x;
	}
}
export default Vector2D;
