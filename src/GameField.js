import { Container, Graphics } from "pixi.js";
import { Matrix } from "./Matrix"
import { Element } from "./Figures/Element"

export class GameField
{
	constructor(width, height)
	{
		this.width  = width;
		this.height = height;

		const background = new Graphics().roundRect(0, 0, width, height, 0).fill(0xaaaaaa);
		background.alpha = 0.8;

		this.matrix 		= new Matrix(); // Matrix for elements.
		this.figureMatrix 	= new Matrix(); // Matrix for figure.

		this.view = new Container();
		this.view.addChild(background);
		this.elem_area = new Container();
		this.view.addChild(this.elem_area);
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

	insert_current_figure(figure)
	{
		this.figureMatrix = new Matrix();
		const elems = figure.get_all_elements();
		for (let i = 0; i < 4; i++)
			this.figureMatrix.insert_element(elems[i]);
	}

	insert_const_figure(figure)
	{
		const elems = figure.get_all_elements();
		for (let i = 0; i < 4; i++)
			this.matrix.insert_element(elems[i]);
	}

	update()
	{
		const elem_width  = this.width  / 10;
		const elem_height = this.height / 20;

		this.elem_area.removeChildren();

		for (let x = 0; x < 10; x++)
		{
			for (let y = 0; y < 20; y++)
			{
				// draw constant elements.
				if (this.matrix.matrix[y][x])
				{
					const elem = new Element(elem_width, elem_height, this.matrix.matrix[y][x].color);
					elem.set_position(x * elem_width, y * elem_height);
					this.elem_area.addChild(elem.view);
				}

				// draw current figure.
				if (this.figureMatrix.matrix[y][x])
				{
					const elem = new Element(elem_width, elem_height, this.figureMatrix.matrix[y][x].color);
					elem.set_position(x * elem_width, y * elem_height);
					this.elem_area.addChild(elem.view);
				}
			}
		}
	}
}