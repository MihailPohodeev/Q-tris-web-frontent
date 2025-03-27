import { Container } from "pixi.js";
import { StandardButton } from './StandardButton.js'
import {EnterenceScene} from './EnterenceScene'

export class MultiPlayerChoiceTypeScene
{
	constructor(app)
	{
		const connect_button = new StandardButton("connect to room", 200, 50, "#FFFFFF");
		const create_button = new StandardButton("create room", 200, 50, "#FFFFFF");
		const back_button = new StandardButton("back", 200, 50, "#FFFFFF");

		connect_button.view.position.x = app.screen.width / 2;
		connect_button.view.position.y = app.screen.height / 2;

		create_button.view.position.x = app.screen.width / 2;
		create_button.view.position.y = app.screen.height / 2 + 60;

		back_button.view.position.x = app.screen.width / 2;
		back_button.view.position.y = app.screen.height / 2 + 120;
		this.view = new Container();
		this.view.addChild(connect_button.view, create_button.view, back_button.view);

		back_button.button.onPress.connect(() => {
			app.stage.removeChild(globalThis.current_scene.view);
			globalThis.current_scene = new EnterenceScene(app);
			app.stage.addChild(globalThis.current_scene.view);
		});
	}
}