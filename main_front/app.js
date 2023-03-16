import * as PIXI from 'pixi.js';

const Application = PIXI.Application;

const app = new Application({
	width: 500,
	height: 500,
	transparent:false,
	antialias: true
});

app.renderer.backgroundColor = 0x23395D;

app.renderer.resize(window.innerWidth,window.innerHeight);

app.renderer.view.style.position = 'absolute';

document.body.appendChild(app.view);


const Graphics = PIXI.Graphics;

const rectangle = new Graphics();
rectangle.beginFill(0xAA33BB)
.lineStyle(4, 0xFFA00, 1)
.drawRect(200, 200, 100, 120)
.endFill();

app.stage.addChild(rectangle);
