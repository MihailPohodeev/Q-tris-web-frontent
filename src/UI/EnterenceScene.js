import { Container } from "pixi.js";
import { StandardButton } from './StandardButton'
import { MultiPlayerChoiceTypeScene } from './MultiPlayerChoiceTypeScene'
import { SinglePlayerSettingsScene } from './SinglePlayerSettingsScene'


export class EnterenceScene
{
	constructor(app)
	{
		const sp_button = new StandardButton("single-player", 200, 50, "#FFFFFF");
		const mp_button = new StandardButton("multi-player", 200, 50, "#FFFFFF");
		const sett_button = new StandardButton("settings", 200, 50, "#FFFFFF");

		sp_button.view.position.x = app.screen.width / 2;
		sp_button.view.position.y = app.screen.height / 2;

		mp_button.view.position.x = app.screen.width / 2;
		mp_button.view.position.y = app.screen.height / 2 + 60;

		sett_button.view.position.x = app.screen.width / 2;
		sett_button.view.position.y = app.screen.height / 2 + 120;
		this.view = new Container();
		this.view.addChild(sp_button.view, mp_button.view, sett_button.view);

		sp_button.button.onPress.connect(() => {
			app.stage.removeChild(globalThis.current_scene.view);
			globalThis.current_scene = new SinglePlayerSettingsScene(app);
			app.stage.addChild(globalThis.current_scene.view);
		})

		mp_button.button.onPress.connect(() => {
			app.stage.removeChild(globalThis.current_scene.view);
			globalThis.current_scene = new MultiPlayerChoiceTypeScene(app);
			app.stage.addChild(globalThis.current_scene.view);
		});
		sett_button.button.onPress.connect(() => {console.log('settings');});
	}

	update() {}
}