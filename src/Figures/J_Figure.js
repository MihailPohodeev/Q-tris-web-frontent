import { Figure } from "./Figure"



export class J_Figure extends Figure
{
	constructor(width, height, color)
	{
		super(width, height, color)

		this.elements[1].move(-this.width, 0);
		this.elements[2].move(0, -this.height);
		this.elements[3].move(0, -2 * this.height);
	}

	copy()
	{
		const result = new J_Figure(this.width, this.height, this.color);
		return result;
	}
}