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

	copy()
	{
		const result = new Matrix();
		result.matrix = this.matrix.copy();
	}
}