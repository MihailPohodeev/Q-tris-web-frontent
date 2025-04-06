import { Container, Graphics, Text, Sprite, Texture } from "pixi.js";


export class Matrix
{
	constructor()
	{
		this.matrix = new Array(20);
		
		// fill matrix by nullptrs.
		for (let i = 0; i < 20; i++) {
		    this.matrix[i] = new Array(10).fill(null);
		}
	}

	insert_element(element)
	{
		if (element.x < 0 || element.x > 9 || element.y < 0 || element.y > 19)
		{
			throw new Error('Invalid indexes coordinats in element param :)');
		}

		this.matrix[element.y][element.x] = { color : element.color };
	}

	copy()
	{
		const result = new Matrix();
		result.matrix = this.matrix.copy();
	}
}