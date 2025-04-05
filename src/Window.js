import { GameField } from "./GameField"
import { ScoreTable } from "./ScoreTable"
import { KeyboardController } from "./KeyboardController"
import { Container } from "pixi.js";


export class Window
{
	constructor(width, height)
	{
		this.width = width * 1.02;
		this.height = height * 1.02;
		this.view = new Container();

		const gameField  = new GameField(width / 2, height);
		const scoreTable = new ScoreTable(width / 2, height);

		gameField.move((this.width - width) / 2, (this.height - height) / 2);
		scoreTable.move(this.width / 2 + (this.width - width) / 2, (this.height - height) / 2);

		this.view.addChild(gameField.view, scoreTable.view);

		this.keyboardController = new KeyboardController();
	}

	move(x, y)
	{
		this.view.position.x += x;
		this.view.position.y += y;
	}

	set_position(x, y)
	{
		this.view.position.x = x;
		this.view.position.y = y;
	}

	update() {
    	throw new Error('The update() method must be overrided in the subclass.');
  	}
}