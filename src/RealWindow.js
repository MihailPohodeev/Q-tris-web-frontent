import { Window } from "./Window"
import { KeyboardController } from "./KeyboardController"
import { J_Figure } from "./Figures/J_Figure"
import { L_Figure } from "./Figures/L_Figure"
import { S_Figure } from "./Figures/S_Figure"
import { Z_Figure } from "./Figures/Z_Figure"
import { T_Figure } from "./Figures/T_Figure"
import { I_Figure } from "./Figures/I_Figure"
import { O_Figure } from "./Figures/O_Figure"

export class RealWindow extends Window
{
	constructor(width, height)
	{
		super(width, height);

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

		const randomInt = Math.floor(Math.random() * 7);
		this.currentFigure = this.figuresArray[randomInt].copy();
		this.currentFigure.set_position(5, 1);

		this.gameField.insert_current_figure(this.currentFigure);
		this.gameField.update();

		this.keyboardController = new KeyboardController();

		this.score = 0;
		this.lines = 0;
		this.level = 1;
		this.timeOut = 1.0 / (this.level / 0.5);
	}

	update()
	{
		// current figure movement and rotation.
		if (this.keyboardController.isKeyPressedOnce('ArrowLeft'))
		{
			let isCanMoveLeft = true;
			const elems = this.currentFigure.get_all_elements();
			for (let i = 0; i < 4; i++)
			{
				const x = elems[i].x;
				const y = elems[i].y;

				if (x <= 0 || ( y >= 0 && y <= 19 && x <= 9 && this.gameField.matrix.matrix[y][x - 1] ))
					isCanMoveLeft = false;
			}
			if (isCanMoveLeft)
				this.currentFigure.move(-1, 0);
		}


		if (this.keyboardController.isKeyPressedOnce('ArrowRight'))
		{
			let isCanMoveRight = true;
			const elems = this.currentFigure.get_all_elements();
			for (let i = 0; i < 4; i++)
			{
				const x = elems[i].x;
				const y = elems[i].y;

				if (x >= 9 || ( y >= 0 && y <= 19 && x >= 0 && this.gameField.matrix.matrix[y][x + 1] ))
					isCanMoveRight = false;
			}
			if (isCanMoveRight)
				this.currentFigure.move(1, 0);
		}


		if (this.keyboardController.isKeyPressedOnce('Space'))
		{
			this.currentFigure.rotate_right();
		}

		// make a tick.
		if ((globalThis.gameTimer > this.timeOut) || (this.keyboardController.isKeyPressed('ArrowDown') && globalThis.gameTimer > (this.timeOut / 4.0)))
		{
			// if the elems or border under current figure.
			let isNeedToFixFigure = false;
			const elems = this.currentFigure.get_all_elements();
			for (let i = 0; i < 4; i++)
			{
				const x = elems[i].x;
				const y = elems[i].y;

				if (x < 0 || x > 9 || y < 0 || y > 19)
					continue;

				if (y >= 19 || this.gameField.matrix.matrix[y + 1][x] != null)
				{
					isNeedToFixFigure = true;
					break;
				}
			}

			if (isNeedToFixFigure)
			{
				this.gameField.insert_const_figure(this.currentFigure);

				const randomInt = Math.floor(Math.random() * 7);
				this.currentFigure = this.figuresArray[randomInt].copy();
				this.currentFigure.set_position(5, 1);

				// destroying filled lines.
				for (let i = 0; i < 20; i++)
				{
					let isNeedToDestroyLine = true;
					for (let j = 0; j < 10; j++)
					{
						if(!this.gameField.matrix.matrix[i][j])
							isNeedToDestroyLine = false;
					}

					if (isNeedToDestroyLine)
					{
						for (let j = i; j > 0; j--)
						{
							for (let k = 0; k < 10; k++)
							{
								this.gameField.matrix.matrix[j][k] = this.gameField.matrix.matrix[j - 1][k];
							}
						}
					}
				}
			}
			else
			{
				this.currentFigure.move(0, 1);
			}
			
			globalThis.gameTimer = 0.0;
		}

		this.gameField.insert_current_figure(this.currentFigure);
		this.gameField.update();
	}
}