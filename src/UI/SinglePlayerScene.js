import { Container, Graphics} from "pixi.js";
import { RealWindow } from "../RealWindow"


export class SinglePlayerScene
{
	constructor(app)
	{
		  const sizeXY = Math.min(app.screen.height, app.screen.width) * 0.8;
		  this.window = new RealWindow(sizeXY, sizeXY);
		  this.window.set_position((app.screen.width - sizeXY) / 2, (app.screen.height - sizeXY) / 2);

		  this.view = this.window.view;
	}

	set_start_level(level)
	{
		this.window.set_start_level(level);
	}

	update()
	{
		this.window.update();
		// this.view.alpha -= 0.005;
	}
}