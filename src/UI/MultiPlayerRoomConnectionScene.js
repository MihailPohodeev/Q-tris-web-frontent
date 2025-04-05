import { Container, Graphics, Text, Sprite, Texture } from "pixi.js";
import { StandardButton } from './StandardButton.js'
import { List, ScrollBox, FancyButton } from '@pixi/ui';
import {EnterenceScene} from './EnterenceScene'


export class MultiPlayerRoomConnectionScene
{
	constructor(app)
	{
		const ui_width  = 300;
		const ui_height = 50;

        const list_width = 500;
        const list_height= 400;

		const items_full = [
		    "Первый элемент списка",
		    "Второй элемент",
		    "Третий пункт",
		    "Четвертый элемент списка",
		    "Пятый и последний элемент",
		    "Шестой дополнительный элемент",
		    "Седьмой элемент для демонстрации скролла",
		    "Восьмой элемент списка",
		    "Девятый пункт меню",
		    "Десятый завершающий элемент"
		];

        const elementsWidth = 480;
        const elementsHeight = 50;
        const radius = 10;
        let currentSizeID = 0;
        const fontColor = '#000000';
    	const backgroundColor = '#FFFFFF';
    	const itemsAmount = items_full.length;
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

        const item_action = (a) =>
        {
            console.log('item_' + a.num);
        };

        const items = [];
        for (let i = 0; i < itemsAmount; i++)
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
                 	text: `Item ${i + 1}`,
               		style: {
                        fontFamily: 'ChaChicle', // Можно указывать несколько шрифтов
                        fontSize: 20,
                        fill: fontColor, // Используем переданный цвет
                        fontWeight: 'bold',
                        letterSpacing: 0.5,
                    }
              	}),
            });

            button.num = i;
            button.anchor.set(0);
            button.onPress.connect(() => item_action(button));

            items.push(button);
        }

        scrollBox.addItems(items);

        scrollBox.position.x = (app.screen.width - list_width) / 2;
        scrollBox.position.y = (app.screen.height - list_height) / 2 - 120;

		const back_button  = new StandardButton("back", ui_width, ui_height, "#FFFFFF");
		
		back_button.view.position.x = app.screen.width / 2;
		back_button.view.position.y = app.screen.height / 2 + 120;
		this.view = new Container();
		this.view.addChild(scrollBox, back_button.view);

		back_button.button.onPress.connect(() => {
			app.stage.removeChild(globalThis.current_scene.view);
			globalThis.current_scene = new EnterenceScene(app);
			app.stage.addChild(globalThis.current_scene.view);
		});
	}
}