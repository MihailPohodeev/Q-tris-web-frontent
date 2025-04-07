import { Container, Graphics, Text } from "pixi.js";

export class ScoreTable
{
	constructor(width, height)
	{
		this.width  = width;
		this.height = height;

		const fontColor = 0xffffff;
		const usernameColor = 0xff0000;
		const fontSize  = (width + height) / 30;

		const background = new Graphics().roundRect(0, 0, width, height, 0).fill(0xaaaaaa);
		background.alpha = 0.8;

		this.usernameLabel = new Text(
			{
			text : "NO-NAME",
			style: {
                fontFamily: 'ChaChicle', // Можно указывать несколько шрифтов
                fontSize: fontSize,
                fill: usernameColor, // Используем переданный цвет
                fontWeight: 'bold',
                letterSpacing: 0.5,
            }}
			);

		this.scoreLabel = new Text(
			{
			text : "SCORE : 0",
			style: {
                fontFamily: 'ChaChicle', // Можно указывать несколько шрифтов
                fontSize: fontSize,
                fill: fontColor, // Используем переданный цвет
                fontWeight: 'bold',
                letterSpacing: 0.5,
            }}
            );

		this.linesLabel = new Text(
			{
			text : "LINES  : 0",
			style: {
                fontFamily: 'ChaChicle', // Можно указывать несколько шрифтов
                fontSize: fontSize,
                fill: fontColor, // Используем переданный цвет
                fontWeight: 'bold',
                letterSpacing: 0.5,
            }});

		this.levelLabel = new Text(
			{
			text : "LEVEL : 0",
			style: {
                fontFamily: 'ChaChicle', // Можно указывать несколько шрифтов
                fontSize: fontSize,
                fill: fontColor, // Используем переданный цвет
                fontWeight: 'bold',
                letterSpacing: 0.5,
            }});

		this.usernameLabel.position.x = (width - this.usernameLabel.width) / 2
		this.scoreLabel.position.x = width * 0.1;
		this.linesLabel.position.x = width * 0.1;
		this.levelLabel.position.x = width * 0.1;

		this.usernameLabel.position.y = height * 0.05;
		this.scoreLabel.position.y = height * 0.15;
		this.linesLabel.position.y = height * 0.225;
		this.levelLabel.position.y = height * 0.30;

		this.view = new Container();
		this.view.addChild(background, this.scoreLabel, this.linesLabel, this.levelLabel, this.usernameLabel);

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

	set_score(score)
	{
		this.scoreLabel.text = "SCORE : " + score;
	}

	set_level(level)
	{
		this.levelLabel.text = "LEVEL : " + level;
	}

	set_lines(lines)
	{
		this.linesLabel.text = "LINES  : " + lines;
	}

	set_username(username)
	{
		this.usernameLabel.text = username;
	}
}