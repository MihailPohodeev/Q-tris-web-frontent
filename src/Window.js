import { GameField } from "./GameField"
import { ScoreTable } from "./ScoreTable"
import { Container } from "pixi.js";


export class Window
{
	constructor(width, height)
	{
		this.width = width * 1.02;
		this.height = height * 1.02;
		this.view = new Container();

		this.gameField  = new GameField(width / 2, height);
		this.scoreTable = new ScoreTable(width / 2, height);

		this.gameField.move((this.width - width) / 2, (this.height - height) / 2);
		this.scoreTable.move(this.width / 2 + (this.width - width) / 2, (this.height - height) / 2);

		this.view.addChild(this.gameField.view, this.scoreTable.view);
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