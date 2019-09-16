import Vector2D from './components/Vector2D';
import Engine from './components/Engine';
import './main.css';
import Particle from './components/Particle';

const engine = new Engine(1500, 800);

engine.loadStage(e => {
	// e.addParticle(
	// 	new Vector2D(750, 400),
	// 	new Vector2D(0, 0),
	// 	1000,
	// 	{ isStatic: true, polarity: 1, hasGravity: false, bounceFactor: 0.75 },
	// 	1
	// );

	// e.addParticle(
	// 	new Vector2D(650, 400),
	// 	new Vector2D(0, 0),
	// 	250,
	// 	{ isStatic: false, polarity: -1, hasGravity: false, bounceFactor: 0.75 },
	// 	100
	// );

	// e.addParticle(
	// 	new Vector2D(850, 400),
	// 	new Vector2D(0, 0),
	// 	250,
	// 	{ isStatic: false, polarity: -1, hasGravity: false, bounceFactor: 0.75 },
	// 	100
	// );

	// e.addParticle(
	// 	new Vector2D(750, 500),
	// 	new Vector2D(0, 0),
	// 	250,
	// 	{ isStatic: false, polarity: -1, hasGravity: false, bounceFactor: 0.75 },
	// 	100
	// );

	e.addObject(
		new Particle(
			new Vector2D(0, 400),
			new Vector2D(2, 2),
			250,
			{ isStatic: false, polarity: 0, hasGravity: true, bounceFactor: 0.75 },
			100
		)
	);

	e.addObject(
		new Particle(
			new Vector2D(1500, 400),
			new Vector2D(-2, 2),
			250,
			{ isStatic: false, polarity: 0, hasGravity: false, bounceFactor: 0.75 },
			100
		)
	);

	// for (let i = 0; i < 7; i += 1) {
	// 	e.addParticle(
	// 		new Vector2D(150 + 200 * i, 400),
	// 		new Vector2D(0, 0),
	// 		500,
	// 		{
	// 			isStatic: true,
	// 			polarity: i % 2 === 0 ? -1 : 1,
	// 			hasGravity: false,
	// 			bounceFactor: 0.75
	// 		},
	// 		200
	// 	);
	// }
});

engine.start();

// setTimeout(() => {
// 	engine.loadStage(e => {
// 		e.addParticle(new Vector2D(200, 400), new Vector2D(0, 0), 500, true, 0, 1);

// 		e.addParticle(
// 			new Vector2D(600, 300),
// 			new Vector2D(6, 0),
// 			50,
// 			false,
// 			0,
// 			200
// 		);

// 		e.addParticle(
// 			new Vector2D(900, 300),
// 			new Vector2D(-6, 0),
// 			50,
// 			false,
// 			0,
// 			200
// 		);
// 	});
// }, 5000);
