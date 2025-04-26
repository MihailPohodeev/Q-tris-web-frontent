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

		this.currentFigureIndex = Math.floor(Math.random() * 7);
		this.currentFigure = this.figuresArray[this.currentFigureIndex].copy();
		this.currentFigure.set_position(5, 1);

		this.gameField.insert_current_figure(this.currentFigure);
		this.gameField.update();

		this.keyboardController = new KeyboardController();

		this.score 				= 0;
		this.lines 				= 0;
		this.level 				= 1;
		this.currentLinesLimit 	= 10;
		this.timeOut 			= 1.0 / (this.level / 0.5);

		this.lastSendTime 		= 0;
        this.sendInterval 		= 100;

        this.isLoose 			= false;
	}

	set_start_level(level)
	{
		this.level = level;
		this.timeOut = 1.0 / (this.level / 0.5);
	}

	update_current_figure()
	{
		this.currentFigureIndex = Math.floor(Math.random() * 7);
		this.currentFigure = this.figuresArray[this.currentFigureIndex].copy();
		this.currentFigure.set_position(5, 1);
	}

	async send_data() {
	    try {
	    	// Throttle sends to avoid flooding
	        const now = Date.now();
	        if (now - this.lastSendTime < this.sendInterval) {
	            return;
	        }
	        // Проверяем наличие сокета и его состояние
	        if (!globalThis.socket || globalThis.socket.readyState !== WebSocket.OPEN) {
	        	return;
	        }

	        if (!this.currentFigure)
	        	return;

	        // Подготавливаем данные
	        const matrix = this.gameField.matrix.matrix;
	        const dataFrame = {
	        	command : "data_frame",
	        	body : {
				        	content : [],
				        	figure  : { index : 		this.currentFigureIndex,
				        				x : 			this.currentFigure.indexes.x,
				        				y : 			this.currentFigure.indexes.y,
				        				rotate_pos : 	this.currentFigure.currentRotatePosition,
				        				color : 		this.currentFigure.color,
				        				},
				        	level 	: this.level,
				        	lines 	: this.lines,
				        	score 	: this.score,
	        			},
	        };

	        for (let i = 0; i < 20; i++)
	        {
	        	for (let j = 0; j < 10; j++)
	        	{
	        		if (matrix[i][j])
	        			dataFrame.body.content.push({x : j, y : i, color : matrix[i][j].color});
	        	}
	        }

	        // Simple send without Promise (WebSocket is already async)
            globalThis.socket.send(JSON.stringify(dataFrame));
            this.lastSendTime = now;
	    } catch (error) {
	        console.error('Failed to send data:', error);
	        // Здесь можно добавить логику повторной отправки или уведомления пользователя
	    }
	}

	update()
	{
		// move current figure left.
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

		// move current figure right.
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

		// rotate current figure.
		if (this.keyboardController.isKeyPressedOnce('Space'))
		{
			this.currentFigure.rotate_right();
		}

		// drop figure.
		if (this.keyboardController.isKeyPressedOnce('ArrowUp'))
		{
			let isStop = false;

			while (!isStop)
			{
				const elems = this.currentFigure.get_all_elements();
				for (let i = 0; i < 4; i++)
				{
					const x = elems[i].x;
					const y = elems[i].y;

					if (y >= 19 || (x >= 0 && x <= 9 && y >= 0 && this.gameField.matrix.matrix[y + 1][x]))
					{
						isStop = true;
					}
				}
				if (!isStop)
					this.currentFigure.move(0, 1);
			}
		}

		// make a tick.
		if ((!this.isLoose) && ((globalThis.gameTimer > this.timeOut) || (this.keyboardController.isKeyPressed('ArrowDown') && globalThis.gameTimer > (this.timeOut / 4.0))))
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

				const elems = this.currentFigure.get_all_elements();
				for (let i = 0; i < 4; i++)
				{
					const y = elems[i].y;

					if (y == 0)
					{
						this.isLoose = true;
						const request = 
						{
							command : "loose"
						};
						globalThis.socket.send(JSON.stringify(request));
						break;
					}
				}

				this.update_current_figure();

				let countOfDestroyedLines = 0;
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
						countOfDestroyedLines++;
						for (let j = i; j > 0; j--)
						{
							for (let k = 0; k < 10; k++)
							{
								this.gameField.matrix.matrix[j][k] = this.gameField.matrix.matrix[j - 1][k];
							}
						}
					}
				}
				this.lines += countOfDestroyedLines;
				if (this.lines > this.currentLinesLimit)
				{
					this.currentLinesLimit = Math.floor(this.currentLinesLimit * 1.5);
					this.level++;
				}

				this.timeOut = 1.0 / (this.level / 0.5);
			}
			else
			{
				this.currentFigure.move(0, 1);
			}
			
			this.scoreTable.set_score(this.score);
			this.scoreTable.set_level(this.level);
			this.scoreTable.set_lines(this.lines);

			globalThis.gameTimer = 0.0;
		}

		this.gameField.insert_current_figure(this.currentFigure);
		this.gameField.update();
	}
}