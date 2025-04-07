import { Container, Graphics, Text } from "pixi.js";
import { StandardButton } from './StandardButton.js'
import { Input } from '@pixi/ui';
import {EnterenceScene} from './EnterenceScene'


export class MultiPlayerRoomCreationScene
{
	constructor(app)
	{
		const ui_width  = 300;
		const ui_height = 50;
		const radius = 15;
		const border = 3;
		const borderColor = "#000000";
		const backgroundColor = "#ffffff";
		const textColor = "#000000";
		const fontSize = (ui_width + ui_height) / 10;
		const placeholderSize = fontSize / 2;
		const paddingTop = 5;
		const paddingRight = 15;
		const paddingBottom = 5;
		const paddingLeft = 15;
		const maxLength = 25;
		const align = 1;
		const start_level_placeholder = "input start level value...";
		const players_count_placeholder = "players count value...";

		const players_count_value_label = new Text({text: "players count : ", style: {
            fontSize: fontSize,
            fill: '#000000',
            align: 'center',
            fontFamily: 'ChaChicle'
        }});

        const figures_spawn_mode_label = new Text({text: "figures spawn mode : ", style: {
            fontSize: fontSize,
            fill: '#000000',
            align: 'center',
            fontFamily: 'ChaChicle'
        }});

		const start_level_value_label = new Text({text: "start level value : ", style: {
            fontSize: fontSize,
            fill: '#000000',
            align: 'center',
            fontFamily: 'ChaChicle'
        }});

		const start_level_input = new Input({
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
                    placeholder: start_level_placeholder,
                    // value: text,
                    padding: [paddingTop, paddingRight, paddingBottom, paddingLeft],
                    // cleanOnFocus,
                    // addMask,
                });

		const players_count_input = new Input({
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
                    placeholder: players_count_placeholder,
                    // secure,
                    // value: text,
                    padding: [paddingTop, paddingRight, paddingBottom, paddingLeft],
                    // cleanOnFocus,
                    // addMask,
                });

		const back_button  = new StandardButton("back", ui_width, ui_height, "#FFFFFF");
		const start_button = new StandardButton("start game", ui_width, ui_height, "#FFFFFF");

		figures_spawn_mode_label.position.x = app.screen.width / 2 - figures_spawn_mode_label.width;
		figures_spawn_mode_label.position.y = app.screen.height / 2 - 120;

		players_count_value_label.position.x = app.screen.width / 2 - players_count_value_label.width;
		players_count_value_label.position.y = app.screen.height / 2 - 60;

		start_level_value_label.position.x = app.screen.width / 2 - start_level_value_label.width;
		start_level_value_label.position.y = app.screen.height / 2;
		players_count_input.position.x = app.screen.width / 2;
		players_count_input.position.y = app.screen.height / 2 - 60;
		start_level_input.position.x = app.screen.width / 2;
		start_level_input.position.y = app.screen.height / 2;
		start_button.view.position.x = app.screen.width / 2;
		start_button.view.position.y = app.screen.height / 2 + 80;
		back_button.view.position.x = app.screen.width / 2;
		back_button.view.position.y = app.screen.height / 2 + 140;
		this.view = new Container();
		this.view.addChild(players_count_value_label, figures_spawn_mode_label, start_level_value_label, players_count_input, start_level_input, start_button.view, back_button.view);

		back_button.button.onPress.connect(() => {
			app.stage.removeChild(globalThis.current_scene.view);
			globalThis.current_scene = new EnterenceScene(app);
			app.stage.addChild(globalThis.current_scene.view);
		});
	}

	update() {}
}