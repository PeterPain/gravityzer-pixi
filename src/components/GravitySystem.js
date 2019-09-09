class GravitySystem {
	constructor() {
		this.members = [];
	}

	add(o) {
		this.members.push(o);
	}

	update() {
		this.members.forEach(m => {
			m.update();
		});
	}
}

export default GravitySystem;
