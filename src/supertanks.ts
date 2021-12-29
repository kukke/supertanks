import {Game} from './Game.js';
import {Circle, Vector, Rectangle} from './Trigonometry.js';
import {Scene} from './Scene.js';
import { IngameScene } from './IngameScene.js';
import { Terrain } from './Terrain.js';

let game = new Game();

let mainMenu = new Scene("main menu");
mainMenu.setBackgroundColor("#0000ff");

let optionsMenu = new Scene("options menu");
optionsMenu.setBackgroundColor("#00ff00");

let playersMenu = new Scene("players menu");
playersMenu.setBackgroundColor("#ff0000");

let ingameScene = new IngameScene();
ingameScene.addTanks(
    [
        { name:"Hubert", color:"red"}, 
        { name:"Martin", color:"blue"},
        { name:"Clarisse", color:"lime"}
    ]);
ingameScene.setBackgroundColor("black");
let terrain = new Terrain({x: 128, y: 128}, 512);
ingameScene.addActor(terrain);

game.activateScene(ingameScene);

ingameScene.addKeyDownHandler("ArrowUp", () => ingameScene.currentTank.power += 1);
ingameScene.addKeyDownHandler("ArrowDown", () => ingameScene.currentTank.power -= 1);
ingameScene.addKeyDownHandler("ArrowLeft", () => ingameScene.currentTank.increaseAngle());
ingameScene.addKeyDownHandler("ArrowRight", () => ingameScene.currentTank.decreaseAngle());
ingameScene.addKeyDownHandler("a", () => ingameScene.nextTurn());

document.addEventListener("mousemove", (ev) => {
    
    let mouseX = ev.offsetX;
    let mouseY = ev.offsetY;
    let p = {x: mouseX, y: mouseY};
    terrain.removeCircle(new Circle(p, 40));
    return;
    let node = terrain.nodeAt(p);
    if (node == undefined) {
        console.log(`nothing at ${mouseX}, ${mouseY}`);
    } else {
        console.log(`button: ${ev.button}`);
        if (ev.button == 0) {
            console.log("subdividing");
            node.subdivide();
        } else if (ev.button == 1) {
            console.log("deleting circle");
            terrain.removeCircle(new Circle(p, 40));
        }
    }
});

function generateTerrain(): Terrain {
    let t = new Terrain({x: 0, y:0});
    return t;
}
