import Vector2D from './Vector2D';

class GravitySystem {
	constructor(G = 6.674, A = 25, gravity = new Vector2D(0, 0.2)) {
		this.members = [];
		this.gravity = gravity;
		this.G = G;
		this.A = A;
		this.toMerge = [];
	}

	add(o) {
		this.members.push(o);
	}

	update() {
		this.toMerge = [];
		this.members.forEach((a, i) => {
			this.members.forEach((a1, i1) => {
				if (a !== a1 && !a1.isStatic) {
					const r = a.pos.dist(a1.pos);
					const acc = (this.G * a.m * r) / (r * r + this.A * this.A) ** (3 / 2);
					const accVec = Vector2D.sub(a.pos, a1.pos)
						.normalize()
						.mult(acc);
					if (
						a.polarity !== 0 &&
						a1.polarity !== 0 &&
						a.polarity + a1.polarity !== 0
					)
						accVec.mult(-1);

					if (
						((a.polarity === -1 && a1.polarity === 1) ||
							(a.polarity === 1 && a1.polarity === -1)) &&
						r < 5 &&
						a.acc.dist(a1.acc) < 2
					) {
						this.toMerge = [i1, i];
					}

					a1.accelerate(accVec);
				}
			});
		});

		this.members.forEach(a => {
			if (a.hasGravity) a.accelerate(this.gravity);
			if (!a.isStatic || a.hasGravity) a.update();
		});
	}

	bounce(w, h) {
		this.members.forEach(member => {
			member.bounce(w, h);
		});
	}

	render() {
		this.members.forEach(member => {
			member.render();
		});
	}
}

export default GravitySystem;
