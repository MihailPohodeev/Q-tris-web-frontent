import { Container, Graphics, Text } from "pixi.js";
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
		this.gameContainer = new Container();
		this.resultContainer = new Container();

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
			this.gameContainer.addChild(nw.view);
		}

		this.gameContainer.addChild(this.window.view);

		const fontColor = 0xffffff;
		const fontSize  = (app.screen.width + app.screen.height) / 80;

		this.resultLabel = new Text(
			{
			text : "RESULT",
			style: {
                fontFamily: 'ChaChicle',
                fontSize: fontSize * 2,
                fill: fontColor,
                fontWeight: 'bold',
                letterSpacing: 0.5,
            }}
			);

		this.resultContentLabel = new Text(
			{
			text : "",
			style: {
                fontFamily: 'ChaChicle',
                fontSize: fontSize,
                fill: fontColor,
                fontWeight: 'bold',
                letterSpacing: 0.5,
            }}
			);

		this.resultLabel.position.x = (app.screen.width - this.resultLabel.width) / 2
		this.resultLabel.position.y = app.screen.height * 0.1;

		this.resultContentLabel.position.x = (app.screen.width - this.resultContentLabel.width) / 2
		this.resultContentLabel.position.y = app.screen.height * 0.2;

		this.resultContainer.addChild( this.resultLabel, this.resultContentLabel );
		this.resultContainer.alpha = 0.0;

		this.view.addChild(this.gameContainer, this.resultContainer);

		globalThis.socket.onmessage = (event) => {

				const response = JSON.parse(event.data);

				if (response.command == "data_frame")
				{
					for (let i = 0; i < this.netWindows.length; i++)
					{
						const id  = this.netWindows[i].id;
						const str = "client_" + id;

						const data = response.content[str];
						if (data)
						{
							this.netWindows[i].set_matrix(data.body.content);
							this.netWindows[i].set_figure(data.body.figure);
							this.netWindows[i].scoreTable.set_score(data.body.score);
							this.netWindows[i].scoreTable.set_lines(data.body.lines);
							this.netWindows[i].scoreTable.set_level(data.body.level);
						}
					}
				}
				else if (response.command == "get_room_settings_response")
				{
					console.log( JSON.stringify(response) );
					this.window.set_start_level(response.params.start_level);
					const array = response.clients;
					for (let i = 0; i < array.length; i++)
					{
						if (array[i].id == globalThis.myID)
						{
							this.window.set_username(array[i].username);
							continue;
						}
						for (let j = 0; j < this.netWindows.length; j++)
						{
							if (array[i].id == this.netWindows[j].id)
							{
								this.netWindows[j].set_username(array[i].username);
								break;
							}
						}
					}
				}
				else if (response.command == "end_game")
				{
					console.log("end game");
					console.log( JSON.stringify(response) );

					const tickerCallback = (time) => {
					    
					    if (this.gameContainer.alpha < 0.001) {
					    	if ( this.resultContainer.alpha < 0.9)
					    	{
					    		this.resultContainer.alpha += time.deltaTime / 60;
					    		this.resultContentLabel.text = "";
					    		for (let i = 0; i < response.players.length; i++)
					    		{
					    			this.resultContentLabel.text += "username : " + response.players[i].username + 
					    											"\nscore : " + response.players[i].score + 
					    											"\nlines : " + response.players[i].lines + 
					    											"\nlevel : " + response.players[i].level + "\n\n";
					    		}
					        	this.resultContentLabel.position.x = (app.screen.width - this.resultContentLabel.width) / 2
					    	}
					        else
					        {
					        	app.ticker.remove(tickerCallback);
					        }
					    }
					    else
					    {
					    	this.gameContainer.alpha -= time.deltaTime / 60;
					    }
					};
					
					app.ticker.add(tickerCallback);
				}
			};

		const request = 
		{
			command : "get_room_settings"
		};

		globalThis.socket.send(JSON.stringify(request));
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