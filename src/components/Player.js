import * as PIXI from 'pixi.js';
import Attractor from './Attractor';
import Vector2D from './Vector2D';

import KeyHandler from './KeyHandler';
import EngineObject from './EngineObject';

class Player extends EngineObject {
	constructor(engine) {
		// init gravity
		const graphics = new PIXI.Graphics();
		const g1 = new PIXI.Graphics();
		g1.beginFill(0xff0000, 0.3);
		g1.drawCircle(0, 0, 50);
		g1.endFill();
		g1.pivot.set(0, 5);
		g1.visible = false;
		graphics.addChild(g1);

		const g2 = new PIXI.Graphics();
		g2.lineStyle(2, 0xffffff);
		g2.drawRect(0, 0, 10, 10);
		g2.pivot.set(5, 10);

		graphics.addChild(g2);

		super(
			new Attractor(new Vector2D(200, 750), new Vector2D(0, 0), 0, {
				isStatic: true,
				polarity: 0,
				hasGravity: true,
				bounceFactor: 0
			}),
			graphics
		);
		this.engine = engine;
		this.moving = 0;
		this.jmpCnt = 0;
		this.pulling = false;

		this.g1 = g1;

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
				this.physics.spd.add(new Vector2D(0, -5));
				this.jmpCnt += 1;
			}
		};

		// shoot
		const keyShift = new KeyHandler('Alt');
		keyShift.press = () => {
			this.g1.visible = true;
			this.m = 100;
			this.pulling = true;
		};

		keyShift.release = () => {
			this.g1.visible = false;
			this.pulling = false;
			const mousePos = this.engine.app.renderer.plugins.interaction.mouse.global.clone();
			this.m = 0;
			this.engine.objects.forEach(o => {
				const m = o.physics;
				if (this.physics.pos.dist(m.pos) < 50 && m !== this.physics)
					m.accelerate(
						Vector2D.sub(new Vector2D(mousePos.x, mousePos.y), this.physics.pos)
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
					this.physics.pos
				).mult(0.05);
				this.engine.addParticle(
					this.physics.pos.clone(),
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
						this.physics.pos.clone(),
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
							this.physics.pos.clone(),
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
			this.physics.pos.x += this.moving;
		}

		if (this.pulling) {
			this.engine.objects.forEach(o => {
				const m = o.physics;
				if (m !== this.physics)
					m.accelerate(
						Vector2D.sub(this.physics.pos, m.pos)
							.normalize()
							.mult(0.25)
					);
			});
		}

		// update gravity forces
		super.update();
		if (this.physics.pos.y > 799) this.jmpCnt = 0;
	}
}

export default Player;
