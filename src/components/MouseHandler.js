import * as PIXI from 'pixi.js';
import Vector2D from './Vector2D';

class MouseHandler {
	constructor(engine) {
		this.engine = engine;
		this.startCoords = new PIXI.Point(0, 0);
		this.line = new PIXI.Graphics();
		this.visible = false;

		this.line.visible = false;
		this.engine.app.stage.addChild(this.line);

		window.addEventListener(
			'mouseup',
			() => {
				this.visible = false;
				const mousePosition = this.engine.app.renderer.plugins.interaction.mouse.global.clone();
				this.engine.addParticle(
					new Vector2D(this.startCoords.x, this.startCoords.y),
					Vector2D.sub(
						new Vector2D(mousePosition.x, mousePosition.y),
						new Vector2D(this.startCoords.x, this.startCoords.y)
					).mult(0.05),
					50 + Math.random() * 100,
					false,
					0,
					300
				);
			},
			false
		);

		window.addEventListener(
			'mousedown',
			() => {
				this.startCoords = this.engine.app.renderer.plugins.interaction.mouse.global.clone();
				this.visible = true;
			},
			false
		);
	}

	update() {
		this.line.clear();
		this.line.lineStyle(2, 0xffffff);
		this.line.moveTo(this.startCoords.x, this.startCoords.y);

		this.line.lineTo(
			this.engine.app.renderer.plugins.interaction.mouse.global.x,
			this.engine.app.renderer.plugins.interaction.mouse.global.y
		);
		this.line.visible = this.visible;
	}
}
export default MouseHandler;
