import { Container, Graphics } from "pixi.js";
import { Matrix } from "./Matrix"
import { Element } from "./Figures/Element"

export class GameField
{
	constructor(width, height)
	{
		this.width  = width;
		this.height = height;

		const background = new Graphics().roundRect(0, 0, width, height, 0).fill(0x999999);

		this.matrix = new Matrix();

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

	insert_figure(figure)
	{
		const elems = figure.get_all_elements();
		for (let i = 0; i < 4; i++)
			this.insert_element(elems[i]);
	}

	insert_element(element)
	{
		this.matrix.insert_element(element);
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
				if (this.matrix.matrix[y][x] != null)
				{
					const elem = new Element(elem_width, elem_height, this.matrix.matrix[y][x].color);
					elem.set_position(this.view.position.x + x * elem_width, this.view.position.y + y * elem_height);
					this.elem_area.addChild(elem.view);
				}
			}
		}
	}
}