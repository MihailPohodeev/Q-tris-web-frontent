import { Container, Graphics } from "pixi.js";
import { DualBuffer } from "./DualBuffer"
import { J_Figure } from "./Figures/J_Figure"


export class GameField
{
	constructor(width, height)
	{
		this.width  = width;
		this.height = height;

		const elem_width  = width / 10;
		const elem_height = height / 10;

		this.figuresArray = new Array(1);
		this.figuresArray[0] = new J_Figure(elem_width, elem_height);

		const background = new Graphics().roundRect(0, 0, width, height, 0).fill(0x999999);

		this.dualBuffer = new DualBuffer();

		this.view = new Container();
		this.view.addChild(background);

		const randomInt = Math.floor(Math.random() * 7);
		this.currentFigure = this.figuresArray[0].copy();
		this.view.addChild(this.currentFigure.view);
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

	update()
	{

	}
}