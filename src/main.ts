import { Application, Assets, Sprite, Container, Graphics } from "pixi.js";
import { EnterenceScene } from './UI/EnterenceScene'
import { MultiPlayerRoomConnectionScene } from './UI/MultiPlayerRoomConnectionScene'

(async () => {
  // Create a new application
  const app = new Application();

  // Initialize the application
  await app.init({ background: "#005000", resizeTo: window });

  // Append the application canvas to the document body
  document.getElementById("pixi-container")!.appendChild(app.canvas);

  await Assets.load({
    src: '/assets/fonts/font.ttf', // Path from public folder
    data: { family: 'ChaChicle' }  // Assign a font-family name
  });

  globalThis.gameTimer = 0.0;
  globalThis.current_scene = new EnterenceScene(app);
  app.stage.addChild(globalThis.current_scene.view);
})();
