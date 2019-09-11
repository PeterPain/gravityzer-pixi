import Vector2D from './Vector2D';

class GravitySystem {
	constructor(G = 6.674, A = 25, gravity = new Vector2D(0, 0.2)) {
		this.members = [];
		this.gravity = gravity;
		this.G = G;
		this.A = A;
	}

	add(o) {
		this.members.push(o);
	}

	update(frmCnt) {
		this.members.forEach(a => {
			this.members.forEach(a1 => {
				if (a !== a1 && !a1.isStatic) {
					const r = a.pos.dist(a1.pos);
					const acc = (this.G * a.m * r) / (r * r + this.A * this.A) ** (3 / 2);
					const accVec = Vector2D.sub(a.pos, a1.pos)
						.normalize()
						.mult(acc);
					a1.accelerate(accVec);
				}
			});
		});

		this.members.forEach(a => {
			if (a.hasGravity) a.accelerate(this.gravity);
			if (!a.isStatic || a.hasGravity) a.update(frmCnt);
		});
	}
}

export default GravitySystem;
