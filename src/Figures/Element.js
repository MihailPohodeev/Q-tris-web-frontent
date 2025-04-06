import { Container, Graphics } from "pixi.js";

export class Element
{
	constructor(width, height, color)
	{
		this.width = width;
		this.height= height;
		this.color = color;

		const shape = new Graphics().roundRect(0, 0, width, height, 0).fill(color);

		this.view = new Container();
		this.view.addChild(shape);
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
}