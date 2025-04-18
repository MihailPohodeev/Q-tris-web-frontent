import { Container, Text } from "pixi.js";
import { StandardButton } from './StandardButton.js'
import { EnterenceScene } from './EnterenceScene'



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
				client_id : 0,
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
				console.log('Received data:', event.data);
	            const response = JSON.parse(event.data);
	            
	            if (response.command == "room_clients_info")
	            {
	            	if (response.status == "success")
	            	{
		            	this.clients_label.text = "clients :\n";
		            	for (let i = 0; i < response.clients.length; i++)
		            	{
		            		this.clients_label.text += response.clients[i].id + " " + response.clients[i].username + "\n";
		            	}
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
			};

		const request = {
			command : "get_room_clients_info",
		};
		globalThis.socket.send(JSON.stringify(request));
	}
}