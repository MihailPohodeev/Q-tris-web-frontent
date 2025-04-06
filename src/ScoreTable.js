import { Container, Graphics, Text } from "pixi.js";

export class ScoreTable
{
	constructor(width, height)
	{
		this.width  = width;
		this.height = height;

		const fontColor = 0xffffff;
		const fontSize  = (width + height) / 30;

		const background = new Graphics().roundRect(0, 0, width, height, 0).fill(0xaaaaaa);

		const scoreLabel = new Text(
			{
			text : "SCORE : 0",
			style: {
                fontFamily: 'ChaChicle', // Можно указывать несколько шрифтов
                fontSize: fontSize,
                fill: fontColor, // Используем переданный цвет
                fontWeight: 'bold',
                letterSpacing: 0.5,
            }});

		const linesLabel = new Text(
			{
			text : "LINES : 0",
			style: {
                fontFamily: 'ChaChicle', // Можно указывать несколько шрифтов
                fontSize: fontSize,
                fill: fontColor, // Используем переданный цвет
                fontWeight: 'bold',
                letterSpacing: 0.5,
            }});

		const levelLabel = new Text(
			{
			text : "LEVEL : 0",
			style: {
                fontFamily: 'ChaChicle', // Можно указывать несколько шрифтов
                fontSize: fontSize,
                fill: fontColor, // Используем переданный цвет
                fontWeight: 'bold',
                letterSpacing: 0.5,
            }});

		scoreLabel.position.x = width * 0.1;
		linesLabel.position.x = width * 0.1;
		levelLabel.position.x = width * 0.1;

		scoreLabel.position.y = height * 0.15;
		linesLabel.position.y = height * 0.225;
		levelLabel.position.y = height * 0.30;

		this.view = new Container();
		this.view.addChild(background, scoreLabel, linesLabel, levelLabel);
	}

	move(x, y)
	{
		this.view.position.x += x;
		this.view.position.y += y;
	}

	set_position(x, y)
	{
		this.view.position.x = x;
		this.view.position.y = y;
	}
}