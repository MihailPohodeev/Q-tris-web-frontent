import { Container, Graphics, Text } from "pixi.js";
import { Button } from '@pixi/ui';

export class StandardButton {
    constructor(str, width, height, color) {
        // Create the button container
        this.view = new Container();

        this.width = width;
        this.height = height;
        
        // Create button background
        this.buttonBg = new Graphics()
            .roundRect(0, 0, width, height, 10)
            .fill(color);
        this.buttonBg.position.x -= width / 2;

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
        this.view.addChild(this.buttonBg, text);
        
        // Create the button component
        this.button = new Button(this.view);
    }

    set_color(newColor) {
     
        this.buttonBg.clear();

        const x = this.buttonBg.position.x;
        const y = this.buttonBg.position.y;
     
        this.buttonBg.roundRect(0, 0, this.width, this.height, 10)
                     .fill(newColor);
        
        this.buttonBg.position.x = x;
        this.buttonBg.position.y = y;
    }
};