class KeyHandler {
	constructor(value) {
		this.value = value;
		this.isDown = false;
		this.isUp = true;
		this.press = undefined;
		this.release = undefined;

		// The `downHandler`
		this.downHandler = event => {
			if (event.key === this.value) {
				if (this.isUp && this.press) this.press();
				this.isDown = true;
				this.isUp = false;
				event.preventDefault();
			}
		};

		// The `upHandler`
		this.upHandler = event => {
			if (event.key === this.value) {
				if (this.isDown && this.release) this.release();
				this.isDown = false;
				this.isUp = true;
				event.preventDefault();
			}
		};

		// Attach event listeners
		// const downListener = this.downHandler.bind(this);
		// const upListener = this.upHandler.bind(this);

		window.addEventListener('keydown', this.downHandler, false);
		window.addEventListener('keyup', this.upHandler, false);

		// Detach event listeners
		this.unsubscribe = () => {
			window.removeEventListener('keydown', this.downHandler);
			window.removeEventListener('keyup', this.upHandler);
		};
	}
}

export default KeyHandler;
