import { Window } from "./Window"
import { J_Figure } from "./Figures/J_Figure"
import { L_Figure } from "./Figures/L_Figure"
import { S_Figure } from "./Figures/S_Figure"
import { Z_Figure } from "./Figures/Z_Figure"
import { T_Figure } from "./Figures/T_Figure"
import { I_Figure } from "./Figures/I_Figure"
import { O_Figure } from "./Figures/O_Figure"

export class NetWindow extends Window
{
	constructor(width, height, id)
	{
		super(width, height);
		this.id = id;

		this.figuresArray = new Array(7);

		const elem_width  = width / 20;
		const elem_height = height / 20;
		this.figuresArray[0] = new J_Figure(0xffffff);
		this.figuresArray[1] = new L_Figure(0xff0000);
		this.figuresArray[2] = new S_Figure(0xffff00);
		this.figuresArray[3] = new Z_Figure(0xff00ff);
		this.figuresArray[4] = new T_Figure(0xfab0fa);
		this.figuresArray[5] = new I_Figure(0x00ffff);
		this.figuresArray[6] = new O_Figure(0x0000ff);
	}

	set_matrix(arr)
	{
		this.gameField.clear_matrix();
		for (let i = 0; i < arr.length; i++)
		{
			const x = arr[i].x;
			const y = arr[i].y;
			if (x < 0 || x > 9 || y < 0 || y > 19)
				continue;
			this.gameField.matrix.matrix[y][x] = { color : arr[i].color };
		}
		this.gameField.update();
	}

	set_figure(fig)
	{
		const currentFigure = this.figuresArray[fig.index].copy();
		currentFigure.set_position(fig.x, fig.y);
		currentFigure.set_rotate(fig.rotate_pos);
		currentFigure.set_color(fig.color);

		this.gameField.insert_current_figure(currentFigure);
		this.gameField.update();
	}
}