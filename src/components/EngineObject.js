class EngineObject {
	constructor(p, g = null) {
		this.physics = p;
		this.graphics = g;
	}

	update(dt) {
		this.physics.update(dt);
	}

	render() {
		// update graphics
		if (Array.isArray(this.graphics)) {
			this.graphics.forEach(g => {
				g.x = this.physics.pos.x;
				g.y = this.physics.pos.y;
			});
		} else {
			this.graphics.x = this.physics.pos.x;
			this.graphics.y = this.physics.pos.y;
		}
	}

	disable() {
		if (Array.isArray(this.graphics)) {
			this.graphics.forEach(g => {
				g.visible = false;
			});
		} else {
			this.graphics.visible = false;
		}
	}
}

export default EngineObject;
