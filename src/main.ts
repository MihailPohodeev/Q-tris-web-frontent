import { Application, Assets, Sprite, Container, Graphics } from "pixi.js";
import { EnterenceScene } from './UI/EnterenceScene'
import { MultiPlayerRoomConnectionScene } from './UI/MultiPlayerRoomConnectionScene'
import { RealWindow } from "./RealWindow"

(async () => {
  // Create a new application
  const app = new Application();

  // Initialize the application
  await app.init({ background: "#556B2F", resizeTo: window });

  // Append the application canvas to the document body
  document.getElementById("pixi-container")!.appendChild(app.canvas);

  await Assets.load({
    src: '/assets/fonts/font.ttf', // Path from public folder
    data: { family: 'ChaChicle' }  // Assign a font-family name
  });

  const sizeXY = Math.min(app.screen.height, app.screen.width) * 0.8;
  globalThis.current_scene = new RealWindow(sizeXY, sizeXY);
  globalThis.current_scene.set_position((app.screen.width - sizeXY) / 2, (app.screen.height - sizeXY) / 2);
  app.stage.addChild(globalThis.current_scene.view);

  app.ticker.add((time) => {
    globalThis.current_scene.update();
  })
})();
