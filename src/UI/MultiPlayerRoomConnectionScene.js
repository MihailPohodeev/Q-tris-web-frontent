import { Container, Graphics, Text, Sprite, Texture } from "pixi.js";
import { StandardButton } from './StandardButton.js'
import { List, ScrollBox, FancyButton } from '@pixi/ui';
import { EnterenceScene } from './EnterenceScene'
import { MultiPlayerLobbyScene } from './MultiPlayerLobbyScene'



export class MultiPlayerRoomConnectionScene
{
	constructor(app)
	{
		const ui_width  = 300;
		const ui_height = 50;

        const list_width = 500;
        const list_height= 400;

        const elementsWidth = 480;
        const elementsHeight = 50;
        const radius = 10;
        let currentSizeID = 0;
        const fontColor = '#000000';
    	const backgroundColor = '#FFFFFF';
    	// const type = [null, ...LIST_TYPE];
        
        // Component usage !!!
        const scrollBox = new ScrollBox({
            background: backgroundColor,
            elementsMargin: 10,
            width: list_width,
            height: list_height,
           	radius,
            // type,
            padding: 10,
        });

        scrollBox.position.x = (app.screen.width - list_width) / 2;
        scrollBox.position.y = (app.screen.height - list_height) / 2 - 120;

		const back_button  = new StandardButton("back", ui_width, ui_height, "#FFFFFF");
		
		back_button.view.position.x = app.screen.width / 2;
		back_button.view.position.y = app.screen.height / 2 + 120;
		this.view = new Container();
		this.view.addChild(scrollBox, back_button.view);

        const item_action = (room_id) => {
            const request = {
                command : "connect_to_room",
                room_id : room_id
            };

            globalThis.socket.send(JSON.stringify(request));
        };

		back_button.button.onPress.connect((room_id) => {
			app.stage.removeChild(globalThis.current_scene.view);
            globalThis.current_scene = new EnterenceScene(app);
            app.stage.addChild(globalThis.current_scene.view); 
		});

        const request = { command : "get_rooms_list" };

        globalThis.socket.onmessage = (event) => {
            console.log('Received data:', event.data);
            const response = JSON.parse(event.data);
            
            if (response.command == "get_rooms_list_response")
            {
                if (response.status == "success")
                {
                    const items = [];
                    for (let i = 0; i < response.body.length; i++)
                    {
                        const button = new FancyButton({
                            defaultView: new Graphics()
                                .roundRect(0, 0, elementsWidth, elementsHeight, radius)
                                .fill(0xbbbbbb),
                            hoverView: new Graphics()
                                .roundRect(0, 0, elementsWidth, elementsHeight, radius)
                                .fill(0x999999),
                            pressedView: new Graphics()
                                .roundRect(0, 0, elementsWidth, elementsHeight, radius)
                                .fill(0x666666),
                                text: new Text({
                                text: response.body[i].room_name + " (" + response.body[i].players_count + "/" + response.body[i].players_capacity + ")",
                                style: {
                                    fontFamily: 'ChaChicle',
                                    fontSize: 20,
                                    fill: fontColor,
                                    fontWeight: 'bold',
                                    letterSpacing: 0.5,
                                }
                            }),
                        });

                        button.num = i;
                        button.anchor.set(0);
                        button.onPress.connect(() => item_action(response.body[i].room_id));

                        items.push(button);
                    }
                    scrollBox.addItems(items);
                }
                else 
                    console.log("Can't list!");
            }
            else if (response.command == "connect_to_room_response")
            {
                if (response.status == "success")
                {
                    app.stage.removeChild(globalThis.current_scene.view);
                    globalThis.current_scene = new MultiPlayerLobbyScene(app);
                    app.stage.addChild(globalThis.current_scene.view);
                }
                else
                    console.log("Can't connected to the room!");
            }
        };

        globalThis.socket.send(JSON.stringify(request));
	}

    update() {}
}