
const Application = PIXI.Application;

const screenWidth = window.innerWidth;
const screenHeight = window.innerHeight;

const app = new Application({
	width: 500,
	height: 500,
	antialias: true
});

app.renderer.backgroundColor = 0x202020;


app.renderer.resize(screenWidth,screenHeight);

app.renderer.view.style.position = 'absolute';

document.body.appendChild(app.view);
// 화면 init 하는 공간
const loginform = document.getElementById('login-form');

// 어떤 이미지가 랜덤으로 돌아다니는 코드


const aliens = [];

const totalDudes = 20;

for (let i = 0; i < totalDudes; i++) {
    // create a new Sprite that uses the image name that we just generated as its source
    const dude = PIXI.Sprite.from('static/assets/img/item/건-항아리.png');

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

const roulette = PIXI.Sprite.from('static/assets/img/룰렛_배경X.png');
roulette.anchor.set(0.5);
roulette.x = rouletteX;
roulette.y = rouletteY;
app.stage.addChild(roulette);
////////////////////////////////

// 애니메이션 루프를 추가하여 컨테이너를 지속적으로 회전시킵니다.
app.ticker.add((delta) => {
    roulette.rotation += 0.002 * delta; // 회전 속도를 조절할 수 있습니다.
});

///////////////////////////////////////////////

