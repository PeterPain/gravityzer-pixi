import SpaceShip from './components/SpaceShip';

import Vector2D from './components/Vector2D';
import Engine from './components/Engine';
import './main.css';

const engine = new Engine(1500, 800);

engine.addParticle(
	new Vector2D(750, 400),
	new Vector2D(0, 0),
	500,
	false,
	0,
	1
);

engine.addParticle(
	new Vector2D(600, 300),
	new Vector2D(6, 0),
	50,
	false,
	0,
	200
);

engine.addParticle(
	new Vector2D(900, 300),
	new Vector2D(-6, 0),
	50,
	false,
	0,
	200
);

update();

function update() {
	engine.update();
	requestAnimationFrame(update);
}
