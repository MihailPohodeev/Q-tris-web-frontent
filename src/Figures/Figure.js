import { Container } from "pixi.js";
import { Element } from "./Element"

export class Figure
{
	constructor(width, height, color)
	{
		this.width = width;
		this.height = height;
		this.color = color;
		
		this.view = new Container();
		this.elements = new Array(4);
		for (let i = 0; i < 4; i++)
		{
		    this.elements[i] = new Element(width, height, color);
		    this.view.addChild(this.elements[i].view);
		}
	}

	copy()
	{
		throw new Error('The copy() method must be overrided in the subclass.');
	}

	// move(x, y)
	// {
	// 	this.position.x += x;
	// 	this.position.y += y;
	// }

	// set_position(x, y)
	// {
	// 	this.position.x = x;
	// 	this.position.y = y;
	// }
}