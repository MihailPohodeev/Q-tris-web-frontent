import { Window } from "./Window"
import { KeyboardController } from "./KeyboardController"
import { J_Figure } from "./Figures/J_Figure"

export class RealWindow extends Window
{
	constructor(width, height)
	{
		super(width, height);

		this.figuresArray = new Array(7);

		const elem_width  = width / 20;
		const elem_height = height / 20;
		this.figuresArray[0] = new J_Figure(0xffffff);

		const randomInt = Math.floor(Math.random() * 7);
		this.currentFigure = this.figuresArray[0].copy();
		this.currentFigure.set_position(5, 10);

		this.gameField.insert_figure(this.currentFigure);
		this.gameField.update();

		this.currentFigure.move(0, 5);
		this.gameField.insert_figure(this.currentFigure);
		this.gameField.update();

		this.keyboardController = new KeyboardController();
	}

	update()
	{
		
	}
}