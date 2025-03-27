import { Application, Assets, Sprite, Container, Graphics } from "pixi.js";
import {MultiPlayerRoomCreationScene} from './UI/MultiPlayerRoomCreationScene'

(async () => {
  // Create a new application
  const app = new Application();

  // Initialize the application
  await app.init({ background: "#0cad65", resizeTo: window });

  // Append the application canvas to the document body
  document.getElementById("pixi-container")!.appendChild(app.canvas);

  await Assets.load({
    src: '/assets/fonts/font.ttf', // Path from public folder
    data: { family: 'ChaChicle' }  // Assign a font-family name
  });

  globalThis.current_scene = new MultiPlayerRoomCreationScene(app);
  app.stage.addChild(globalThis.current_scene.view);
})();
