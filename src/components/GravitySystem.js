import Vector2D from './Vector2D';

class GravitySystem {
	constructor(G = 6.674, A = 25, gravity = new Vector2D(0, 0.1)) {
		this.gravity = gravity;
		this.G = G;
		this.A = A;
		this.dt = 0.5; // speed of simulation ww
	}

	update(objects) {
		let toMerge = [];
		objects.forEach((o, i) => {
			const a = o.physics;
			objects.forEach((o1, i1) => {
				const a1 = o1.physics;
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
						a.polarity === -a1.polarity &&
						!a.isStatic &&
						!a1.isStatic &&
						r < Math.sqrt(a.m / 10) &&
						Vector2D.sub(a1.spd, a.spd).length() > 20
					) {
						toMerge = [i1, i];
						if (a.m > a1.m) toMerge = [i, i1];
					}

					a1.accelerate(accVec);
				}
			});
		});

		objects.forEach(o => {
			const a = o.physics;
			if (a.hasGravity) a.accelerate(this.gravity);
			if (!a.isStatic || a.hasGravity) o.update(this.dt);
		});

		return toMerge;
	}
}

export default GravitySystem;
