import { Container, Graphics} from "pixi.js";
import { RealWindow } from "../RealWindow"
import { NetWindow } from "../NetWindow"

export class MultiPlayerScene
{
	constructor(app, roomParams)
	{
		this.players_count	= roomParams.players_count;
		this.start_level 	= roomParams.start_level; 

		const sizeXY = app.screen.width * 0.4;
		this.window = new RealWindow(sizeXY, sizeXY);
		this.window.set_position((app.screen.width / 2 - sizeXY) / 2, (app.screen.height - sizeXY) / 2);
		this.view = new Container();

		this.netWindows = [];


		const dist = (app.screen.width / 2) / (this.players_count - 1);
		let xStart = (app.screen.width / 2 - sizeXY) + sizeXY;
		const len = app.screen.width - xStart;
		const sizeNetXY = dist * 0.8;

		for (let i = 0; i < this.players_count; i++)
		{
			if (globalThis.myID == i)
			{
				continue;
			}
			const nw = new NetWindow(sizeNetXY, sizeNetXY, i);
			nw.set_position(xStart, (app.screen.height - sizeNetXY) / 2);
			xStart += dist;
			this.netWindows.push(nw);
			this.view.addChild(nw.view);
		}

		this.view.addChild(this.window.view);


		globalThis.socket.onmessage = (event) => {

				const response = JSON.parse(event.data);

				if (response.command == "data_frame")
				{
						for (let i = 0; i < this.netWindows.length; i++)
						{
							const id  = this.netWindows[i].id;
							const str = "client_" + id;

							const data = response.content[str];
							console.log(JSON.stringify(data));
							if (data)
							{
								this.netWindows[i].set_matrix(data.content);
								this.netWindows[i].set_figure(data.figure);
							}
						}
				}
			};
	}

	set_start_level(level)
	{
		this.window.set_start_level(level);
	}

	update()
	{
		this.window.update();
	}
}