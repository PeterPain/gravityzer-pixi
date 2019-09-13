import * as PIXI from 'pixi.js';
import Attractor from './Attractor';
import Vector2D from './Vector2D';

import KeyHandler from './KeyHandler';

class Player extends Attractor {
	constructor(engine) {
		// init gravity
		super(new Vector2D(200, 750), new Vector2D(0, 0), 0, {
			isStatic: true,
			polarity: 0,
			hasGravity: true,
			bounceFactor: 0
		});
		this.engine = engine;
		this.moving = 0;
		this.jmpCnt = 0;
		this.pulling = false;

		this.radius = new PIXI.Graphics();
		this.radius.beginFill(0xff0000, 0.3);
		this.radius.drawCircle(0, 0, 50);
		this.radius.endFill();
		this.radius.x = this.pos.x;
		this.radius.y = this.pos.y;
		this.radius.pivot.set(0, 5);
		this.radius.visible = false;
		this.engine.addGraphics(this.radius);

		this.pixi = new PIXI.Graphics();
		this.pixi.lineStyle(2, 0xffffff);
		this.pixi.drawRect(0, 0, 10, 10);
		this.pixi.x = this.pos.x;
		this.pixi.y = this.pos.y;
		this.pixi.pivot.set(5, 10);

		this.engine.addGraphics(this.pixi);

		this.initControls();
	}

	initControls() {
		// LEFT RIGHT
		const keyLeft = new KeyHandler('a');
		keyLeft.press = () => {
			this.moving = -5;
		};

		const keyRight = new KeyHandler('d');
		keyRight.press = () => {
			this.moving = 5;
		};

		keyLeft.release = () => {
			if (!keyRight.isDown) this.moving = 0;
		};

		keyRight.release = () => {
			if (!keyLeft.isDown) this.moving = 0;
		};

		// jump
		const keyUp = new KeyHandler(' ');
		keyUp.press = () => {
			if (this.jmpCnt < 2) {
				this.acc.add(new Vector2D(0, -5));
				this.jmpCnt += 1;
			}
		};

		// shoot
		const keyShift = new KeyHandler('Alt');
		keyShift.press = () => {
			this.radius.visible = true;
			this.m = 100;
			this.pulling = true;
		};

		keyShift.release = () => {
			this.radius.visible = false;
			this.pulling = false;
			const mousePos = this.engine.app.renderer.plugins.interaction.mouse.global.clone();
			this.m = 0;
			this.engine.gravSys.members.forEach(m => {
				if (this.pos.dist(m.pos) < 50 && m !== this)
					m.accelerate(
						Vector2D.sub(new Vector2D(mousePos.x, mousePos.y), this.pos)
							.normalize()
							.mult(15)
					);
			});
		};

		window.addEventListener(
			'mousedown',
			() => {
				const mousePos = this.engine.app.renderer.plugins.interaction.mouse.global.clone();
				const accVec = Vector2D.sub(
					new Vector2D(mousePos.x, mousePos.y),
					this.pos
				).mult(0.05);
				this.engine.addParticle(
					this.pos.clone(),
					accVec.clone(),
					75,
					{
						isStatic: false,
						polarity: 0,
						hasGravity: true,
						bounceFactor: 0.75
					},
					50
				);
				setTimeout(() => {
					this.engine.addParticle(
						this.pos.clone(),
						accVec.clone().rotate(-10),
						25,
						{
							isStatic: false,
							polarity: 1,
							hasGravity: true,
							bounceFactor: 0.75
						},
						10
					);
					setTimeout(() => {
						this.engine.addParticle(
							this.pos.clone(),
							accVec.clone().rotate(10),
							25,
							{
								isStatic: false,
								polarity: -1,
								hasGravity: true,
								bounceFactor: 0.75
							},
							10
						);
					}, 75);
				}, 75);
			},
			false
		);
	}

	update() {
		if (this.moving !== 0) {
			this.pos.x += this.moving;
		}

		if (this.pulling) {
			this.engine.gravSys.members.forEach(m => {
				if (m !== this)
					m.accelerate(
						Vector2D.sub(this.pos, m.pos)
							.normalize()
							.mult(0.25)
					);
			});
		}

		// update gravity forces
		super.update();
		if (this.pos.y > 799) this.jmpCnt = 0;
	}

	render() {
		// update graphics
		this.pixi.x = this.pos.x;
		this.pixi.y = this.pos.y;
		this.radius.x = this.pixi.x;
		this.radius.y = this.pixi.y;
	}
}

export default Player;
