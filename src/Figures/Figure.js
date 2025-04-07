import { Container } from "pixi.js";
import { Element } from "./Element"

export class Figure
{
	constructor(color)
	{
		this.color = color;

		this.rotationPositions = [];
		this.currentRotatePosition = 0;

		this.indexes = {
			x : 0,
			y : 0
		};
	}

	copy()
	{
		throw new Error('The copy() method must be overrided in the subclass.');
	}

	move(x, y)
	{
		this.indexes.x += x;
		this.indexes.y += y;
	}

	set_position(x, y)
	{
		this.indexes.x = x;
		this.indexes.y = y;
	}

	get_all_elements()
	{
		const result = [];

		result.push(
			{
				x : this.indexes.x,
				y : this.indexes.y,
				color : this.color
			}
		);

		for (let i = 0 ; i < 3 ; i++)
		{
			result.push(
				{
					x : this.indexes.x + this.rotationPositions[this.currentRotatePosition][i].x,
					y : this.indexes.y + this.rotationPositions[this.currentRotatePosition][i].y,
					color : this.color
				}
			);
		}
		return result;
	}

	rotate_right()
	{
		this.currentRotatePosition = (this.currentRotatePosition + 1) % this.rotationPositions.length;
	}

	rotate_left()
	{
		this.currentRotatePosition = (this.rotationPositions.length + this.currentRotatePosition - 1) % this.rotationPositions.length;
	}
}