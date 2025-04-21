import { Container, Text } 	from "pixi.js";
import { StandardButton } 	from './StandardButton.js'
import { EnterenceScene } 	from './EnterenceScene'
import { MultiPlayerScene }	from './MultiPlayerScene'


export class MultiPlayerLobbyScene
{
	constructor(app)
	{
		this.isReady = false;
		const ready_button = new StandardButton("ready", 200, 50, "#990000");
		const back_button = new StandardButton("back", 200, 50, "#FFFFFF");

		this.clients_label = new Text({text: "clients :\n", style: {
            fontSize: (app.screen.width + app.screen.height) / 60,
            fill: '#000000',
            align: 'center',
            fontFamily: 'ChaChicle'
        }});

		this.clients_label.position.x = (app.screen.width - this.clients_label.width) / 2;
		this.clients_label.position.y = app.screen.height / 2 - 240;

		ready_button.view.position.x = app.screen.width / 2;
		ready_button.view.position.y = app.screen.height / 2 + 60;

		back_button.view.position.x = app.screen.width / 2;
		back_button.view.position.y = app.screen.height / 2 + 120;
		this.view = new Container();
		this.view.addChild(ready_button.view, back_button.view, this.clients_label);

		ready_button.button.onPress.connect(() => {
			this.isReady = !this.isReady;

			const request = {
				command : "set_ready_value",
				client_id : globalThis.myID,
				ready_value : this.isReady
			};
			globalThis.socket.send(JSON.stringify(request));
		});

		back_button.button.onPress.connect(() => {
			const request = {command : "disconnect"};
			globalThis.socket.send(JSON.stringify(request));
			app.stage.removeChild(globalThis.current_scene.view);
			globalThis.current_scene = new EnterenceScene(app);
			app.stage.addChild(globalThis.current_scene.view);
		});

		globalThis.socket.onmessage = (event) => {
	            const response = JSON.parse(event.data);
	            
	            if (response.command == "room_clients_info_response")
	            {
	            	if (response.status == "success")
	            	{
		            	this.clients_label.text = "clients :\n";
		            	for (let i = 0; i < response.clients.length; i++)
		            	{
		            		this.clients_label.text += response.clients[i].id + " " + response.clients[i].username + "\n";
		            	}

		            	globalThis.myID = response.client_id;

		            	this.isReady = false;
		            	ready_button.set_color('#990000');
	            	}
	            }
	            else if (response.command == "set_ready_value_response")
	            {
	            	if (response.status == "success")
	            	{
	            		if (this.isReady)
	            			ready_button.set_color('#009900');
	            		else
	            			ready_button.set_color('#990000');
	            	}
	            }
	           	else if (response.command == "can_start_game")
	           	{
	           		app.stage.removeChild(globalThis.current_scene.view);
					globalThis.current_scene = new MultiPlayerScene(app, response.room_parameters);

					app.ticker.add((time) => {
					    	globalThis.gameTimer += time.deltaTime / 60;
					    	globalThis.current_scene.update();
					});

					app.ticker.add( async (time) => {
							globalThis.socketTimer += time.deltaTime / 60;

							if (globalThis.socketTimer > 0.2)
							{
					    		await globalThis.current_scene.window.send_data();
					    		globalThis.socketTimer = 0.0;
					    	}

					});

					app.stage.addChild(globalThis.current_scene.view);
	           	}
			};

		const request = {
			command : "get_room_clients_info",
		};
		globalThis.socket.send(JSON.stringify(request));
	}
}