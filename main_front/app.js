
//PIXI.Application의 options에 { transparent: true }를 추가해야 합니다.
const Application = PIXI.Application;
// Application.defaultOptions.transparent = true;

const screenWidth = window.innerWidth;
const screenHeight = window.innerHeight;

const app = new Application({
	width: 500,
	height: 500,
	// transparent:false,
	antialias: true
});

app.renderer.backgroundColor = 0x202020;


app.renderer.resize(screenWidth,screenHeight);

app.renderer.view.style.position = 'absolute';

document.body.appendChild(app.view);
// 화면 init 하는 공간
const loginform = document.getElementById('login-form');


//////////////////////////////////////////////////////

// 간단한 직사각형을 그려보는 공간
/*

const Graphics = PIXI.Graphics;

const rectangle = new Graphics();
rectangle.beginFill(0xAA33BB)
.lineStyle(4, 0xFFA00, 1)
.drawRect(200, 200, 100, 120)
.endFill();

app.stage.addChild(rectangle);
*/

//////////////////////////////////////////////////

/*
// 오와열을 맞추어 돌아가는 장면

const container = new PIXI.Container();

app.stage.addChild(container);
// Create a new texture
// 여기에는 항아리가 들어감
const pot_bundle = [];

const item_texture1 = PIXI.Texture.from('./assets/img/item/그림자검.png');
const item_texture2 = PIXI.Texture.from('./assets/img/item/루시드드림.png');
const item_texture3 = PIXI.Texture.from('./assets/img/item/루시드실크헷.png');
const item_texture4 = PIXI.Texture.from('./assets/img/item/분필.png');

const item_sprint1 = new PIXI.Sprite(item_texture1);
const item_sprint2 = new PIXI.Sprite(item_texture2);
const item_sprint3 = new PIXI.Sprite(item_texture3);
const item_sprint4 = new PIXI.Sprite(item_texture4);

pot_bundle.push(item_sprint1);
pot_bundle.push(item_sprint2);
pot_bundle.push(item_sprint3);
pot_bundle.push(item_sprint4);

// Create a 2x2 grid of bunnies
for (let i = 0; i < 4; i++) {
    // const bunny = new PIXI.Sprite(texture);
	const bunny = pot_bundle.pop();
	bunny.rotation = (Math.PI / 2) * i;
	// resize texture
	// bunny.scale.x = 3; // 3배
	// bunny.scale.y = 3; // 3배
    bunny.anchor.set(0.5);
    bunny.x = (i % 2) * 120;
    bunny.y = Math.floor(i / 2) * 120;
    container.addChild(bunny);
}

// Move container to the center
container.x = app.screen.width / 2;
container.y = app.screen.height / 2;

// Center bunny sprite in local container coordinates
container.pivot.x = container.width / 2;
container.pivot.y = container.height / 2;

// Listen for animate update
app.ticker.add((delta) => {
    // rotate the container!
    // use delta to create frame-independent transform
    container.rotation -= 0.01 * delta;
});

*/

//////////////////////////////////////////////////////

// 어떤 이미지가 랜덤으로 돌아다니는 코드


const aliens = [];

const totalDudes = 20;

for (let i = 0; i < totalDudes; i++) {
    // create a new Sprite that uses the image name that we just generated as its source
    const dude = PIXI.Sprite.from('assets/img/item/건-항아리.png');

    // set the anchor point so the texture is centered on the sprite
    dude.anchor.set(0.5);

    // set a random scale for the dude - no point them all being the same size!
    dude.scale.set(0.8 + Math.random() * 0.3);

    // finally lets set the dude to be at a random position..
    dude.x = Math.random() * app.screen.width;
    dude.y = Math.random() * app.screen.height;

    dude.tint = Math.random() * 0xFFFFFF;

    // create some extra properties that will control movement :
    // create a random direction in radians. This is a number between 0 and PI*2 which is the equivalent of 0 - 360 degrees
    dude.direction = Math.random() * Math.PI * 2;

    // this number will be used to modify the direction of the dude over time
    dude.turningSpeed = Math.random() - 0.8;

    // create a random speed for the dude between 2 - 4
    dude.speed = 2 + Math.random() * 2;

    // finally we push the dude into the aliens array so it it can be easily accessed later
    aliens.push(dude);

    app.stage.addChild(dude);
}

// create a bounding box for the little dudes
const dudeBoundsPadding = 100;
const dudeBounds = new PIXI.Rectangle(-dudeBoundsPadding,
    -dudeBoundsPadding,
    app.screen.width + dudeBoundsPadding * 2,
    app.screen.height + dudeBoundsPadding * 2);

app.ticker.add(() => {
    // iterate through the dudes and update their position
    for (let i = 0; i < aliens.length; i++) {
        const dude = aliens[i];
        dude.direction += dude.turningSpeed * 0.01;
        dude.x += Math.sin(dude.direction) * dude.speed;
        dude.y += Math.cos(dude.direction) * dude.speed;
        dude.rotation = -dude.direction - Math.PI / 2;

        // wrap the dudes by testing their bounds...
        if (dude.x < dudeBounds.x) {
            dude.x += dudeBounds.width;
        } else if (dude.x > dudeBounds.x + dudeBounds.width) {
            dude.x -= dudeBounds.width;
        }

        if (dude.y < dudeBounds.y) {
            dude.y += dudeBounds.height;
        } else if (dude.y > dudeBounds.y + dudeBounds.height) {
            dude.y -= dudeBounds.height;
        }
    }
});

//////////////////////////////////////////////

// 가운데 원판이 회전하는 코드
// 스프라이트를 생성하고 스테이지에 추가합니다.

const rouletteX = app.view.width / 2;
const rouletteY = app.view.height * 0.6;

const roulette = PIXI.Sprite.from('assets/img/룰렛_배경X.png');
roulette.anchor.set(0.5);
roulette.x = rouletteX;
roulette.y = rouletteY;
app.stage.addChild(roulette);


////////////////////////////////

// 애니메이션 루프를 추가하여 컨테이너를 지속적으로 회전시킵니다.
app.ticker.add((delta) => {
    // container.rotation += 0.002 * delta; // 회전 속도를 조절할 수 있습니다.
	// for (let i = 0; i < 4; i++)
		// texts[i].rotation -= 0.002 * delta;
    roulette.rotation += 0.002 * delta; // 회전 속도를 조절할 수 있습니다.
});

///////////////////////////////////////////////

// 좌측 상단에 42마크가 있는 코드
const mark42 = PIXI.Sprite.from('assets/img/navbar-logo.jpg');
mark42.anchor.set(0.5);
mark42.x = app.view.width / 16;
mark42.y = app.view.height / 16;
app.stage.addChild(mark42);

