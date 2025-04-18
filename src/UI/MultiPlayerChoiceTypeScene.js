import { Container, Graphics, Text } from "pixi.js";
import { Input } from '@pixi/ui';
import { StandardButton } from './StandardButton.js'
import { EnterenceScene } from './EnterenceScene'
import { MultiPlayerRoomCreationScene } from './MultiPlayerRoomCreationScene'
import { MultiPlayerRoomConnectionScene } from './MultiPlayerRoomConnectionScene'


export class MultiPlayerChoiceTypeScene
{
	constructor(app)
	{
		const ui_width  					= 300;
		const ui_height 					= 50;
		const radius 						= 15;
		const border 						= 3;
		const borderColor 					= "#000000";
		const backgroundColor 				= "#ffffff";
		const textColor						= "#000000";
		const fontSize 						= (ui_width + ui_height) / 10;
		const placeholderSize 				= fontSize / 2;
		const paddingTop 					= 5;
		const paddingRight 					= 15;
		const paddingBottom 				= 5;
		const paddingLeft 					= 15;
		const maxLength 					= 25;
		const align 						= 1;
		const username_placeholder			= "input your username...";

		const connect_button = new StandardButton("connect to room", 200, 50, "#FFFFFF");
		const create_button = new StandardButton("create room", 200, 50, "#FFFFFF");
		const back_button = new StandardButton("back", 200, 50, "#FFFFFF");

		const username_label = new Text({text: "username : ", style: {
            fontSize: fontSize,
            fill: '#000000',
            align: 'center',
            fontFamily: 'ChaChicle'
        }});

        const room_name_input = new Input({
                    bg: new Graphics()
                        .roundRect(0, 0, ui_width, ui_height, radius + border)
                        .fill(borderColor)
                        .roundRect(border, border, ui_width - (border * 2), ui_height - (border * 2), radius)
                        .fill(backgroundColor),
                    textStyle: {
                        fill: textColor,
                        placeholderSize
                    },
                    maxLength,
                    align,
                    placeholder: username_placeholder,
                    padding: [paddingTop, paddingRight, paddingBottom, paddingLeft],
                });

        username_label.position.x = (app.screen.width - username_label.width) / 2 - username_label.width * 0.75;
        username_label.position.y = app.screen.height / 2 - 80;// - ((room_name_input.height - username_label.height) / 2);

        room_name_input.position.x = (app.screen.width - room_name_input.width) / 2 + room_name_input.width * 0.35;
        room_name_input.position.y = app.screen.height / 2 - 80;

		connect_button.view.position.x = app.screen.width / 2;
		connect_button.view.position.y = app.screen.height / 2;

		create_button.view.position.x = app.screen.width / 2;
		create_button.view.position.y = app.screen.height / 2 + 60;

		back_button.view.position.x = app.screen.width / 2;
		back_button.view.position.y = app.screen.height / 2 + 120;
		this.view = new Container();
		this.view.addChild(connect_button.view, create_button.view, back_button.view, username_label, room_name_input);

		create_button.button.onPress.connect(() => {
			const request = {
					command : "set_username",
					username : room_name_input.value,
				};

			globalThis.socket.send(JSON.stringify(request));

			app.stage.removeChild(globalThis.current_scene.view);
			globalThis.current_scene = new MultiPlayerRoomCreationScene(app);
			app.stage.addChild(globalThis.current_scene.view);
		});

		connect_button.button.onPress.connect(() => {
			const request = {
					command : "set_username",
					username : room_name_input.value,
				};

			globalThis.socket.send(JSON.stringify(request));
			
			app.stage.removeChild(globalThis.current_scene.view);
			globalThis.current_scene = new MultiPlayerRoomConnectionScene(app);
			app.stage.addChild(globalThis.current_scene.view);
		});

		back_button.button.onPress.connect(() => {
			app.stage.removeChild(globalThis.current_scene.view);
			globalThis.current_scene = new EnterenceScene(app);
			app.stage.addChild(globalThis.current_scene.view);
		});

		if (globalThis.socket == undefined)
		{
			globalThis.socket = new WebSocket('ws://localhost:38532/');

			globalThis.socket.onopen = () => {
				console.log('WebSocket connection established');
			};

			globalThis.socket.onmessage = (event) => {
				console.log('Received data:', event.data);
	            const response = JSON.parse(event.data);
	            
	            if (response.command == "set_username_response")
	            {
	                if (response.status == "success")
	                    console.log(event.data);
	                else 
	                    console.log("Can't list!");
	            }
			};


			globalThis.socket.onclose = () => {
				console.log('WebSocket connection closed');
			};

			globalThis.socket.onerror = (error) => {
				console.error('WebSocket error:', error);
			};
		}
	}

	update() {}
}