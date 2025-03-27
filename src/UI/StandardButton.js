import { Container, Graphics, Text } from "pixi.js";
import { Button } from '@pixi/ui';

export class StandardButton {
    constructor(str, width, height, color) {
        // Create the button container
        this.view = new Container();
        
        // Create button background
        const buttonBg = new Graphics()
            .roundRect(0, 0, width, height, 10)
            .fill(color);
        buttonBg.position.x -= width / 2;

        // Create button text
        const text = new Text({text: str, style: {
            fontSize: (width + height) / 10,
            fill: '#000000',
            align: 'center',
            fontFamily: 'ChaChicle'
        }});

        // Center the text
        text.anchor.set(0.5);
        text.position.set(0, height / 2);
        // 
        // Add elements to container
        this.view.addChild(buttonBg, text);
        
        // Create the button component
        this.button = new Button(this.view);
    }
};