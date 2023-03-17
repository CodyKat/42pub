// 텍스트 스타일을 설정합니다.
const textStyle = new PIXI.TextStyle({
    fontFamily: 'Arial',
    fontSize: 36,
    fontWeight: 'bold',
    fill: ['#ffffff', '#00ff99'],
    stroke: '#4a1850',
    strokeThickness: 5,
});

// 텍스트 객체 배열을 생성합니다.
const texts = [
    new PIXI.Text('나의 정보', textStyle),
    new PIXI.Text('상점', textStyle),
    new PIXI.Text('42intra', textStyle),
    new PIXI.Text('coalition', textStyle),
];


const urls = [
	// 'my_info_page.html',
	'prev_index.html',
	'shop_page.html',
	'https://profile.intra.42.fr/',
	'https://profile.intra.42.fr/blocs/27/coalitions/85'
];


for (let i = 0; i < texts.length; i++) {
    texts[i].cursor = 'hover';
    texts[i].interactive = true; // 오타 수정
    texts[i] // button 대신 texts[i] 사용
        .on('pointerdown', function() {onButtonDown.call(this); })
        .on('pointerup', function() {
			onButtonUp.call(this);
			window.location.href = urls[i];
		})
        .on('pointerupoutside', function() {onButtonUp.call(this); })
        .on('pointerover', function() {onButtonOver.call(this); })
        .on('pointerout', function() {onButtonOut.call(this); });
}

// 컨테이너를 생성하고 스테이지에 추가합니다.
const container = new PIXI.Container();
app.stage.addChild(container);

// 회전 중심점을 설정합니다.
container.x = app.view.width / 2;
container.y = app.view.height / 2;



function onButtonDown() {
    this.isdown = true;
    this.style = this.style.clone();
    this.style.stroke = '#ffffff';
    this.alpha = 1;
}

function onButtonUp() {
    this.isdown = false;
    this.style = this.style.clone();
    if (this.isOver) {
        this.style.stroke = '#011111';
    } else {
        this.style.stroke = '#111111';
    }
}

function onButtonOver() {
    this.isOver = true;
    if (this.isdown) {
        return;
    }
    this.style = this.style.clone();
    this.style.stroke = '#777777';
}

function onButtonOut() {
    this.isOver = false;
    if (this.isdown) {
        return;
    }
    this.style = this.style.clone();
    this.style.stroke = '#011111';
}
///////////////////////////

app.ticker.add((delta) => {
    container.rotation += 0.002 * delta; // 회전 속도를 조절할 수 있습니다.
	for (let i = 0; i < 4; i++)
		texts[i].rotation -= 0.002 * delta;
    // roulette.rotation += 0.002 * delta; // 회전 속도를 조절할 수 있습니다.
});

///////////////////////////
// 로그인 직후 보여줘야할 데이터의 투명도를 없애는 코드

let fadeInDuration = 80; // 1000ms = 1초
let elapsed = 0;

app.ticker.add((delta) => {
    elapsed += delta;

    // 페이드 인 애니메이션 진행
    if (elapsed < fadeInDuration) {
        container.alpha = elapsed / fadeInDuration;
    } else {
        // 애니메이션 완료 후, ticker에서 제거
        app.ticker.remove();
    }
});

///////////////////////////



// 텍스트 객체를 컨테이너에 추가하고 배치합니다.
texts.forEach((text, index) => {
    text.anchor.set(0.5);
    text.x = Math.cos(index * Math.PI / 2) * roulette.y / 2;
    text.y = Math.sin(index * Math.PI / 2) * roulette.y / 2;
	// text.interactive = true;
	// text.buttonMode = true;
    container.addChild(text);
});

// 마우스가 텍스트 객체 위에 있을 때 텍스트 객체의 색상을 변경합니다.
container.on('pointerover', (event) => {
	event.target.tint = 0xff0000;
});

// 마우스가 텍스트 객체 위에서 벗어났을 때 텍스트 객체의 색상을 원래대로 되돌립니다.
container.on('pointerout', (event) => {
	event.target.tint = 0xffffff;
});

//pointerover, pointerout 이벤트를 사용하려면
//PIXI.Application의 options에 { transparent: true }를 추가해야 합니다.
//PIXI.Application의 options에 { antialias: true }를 추가하면
//텍스트 객체의 테두리가 부드럽게 보이지만
//텍스트 객체의 색상이 흐려집니다.



// mouse trail
// Get the texture for rope.
const trailTexture = PIXI.Texture.from('assets/img/노란커서.png');
const historyX = [];
const historyY = [];
// historySize determines how long the trail will be.
const historySize = 10;
// ropeSize determines how smooth the trail will be.
const ropeSize = 100;
const points = [];

// Create history array.
for (let i = 0; i < historySize; i++) {
    historyX.push(0);
    historyY.push(0);
}
// Create rope points.
for (let i = 0; i < ropeSize; i++) {
    points.push(new PIXI.Point(0, 0));
}

// Create the rope
const rope = new PIXI.SimpleRope(trailTexture, points);

// Set the blendmode
rope.blendmode = PIXI.BLEND_MODES.ADD;

app.stage.addChild(rope);

console.log('HELLO!');

// let mouseposition = null;
// app.stage.interactive = true;
// app.stage.hitArea = app.screen;
// app.stage.on('mousemove', (event) => {
//     mouseposition = mouseposition || { x: 0, y: 0 };
//     mouseposition.x = event.global.x;
//     mouseposition.y = event.global.y;
// });

// Listen for animate update
// app.ticker.add(() => {
//     if (!mouseposition) return;

//     // Update the mouse values to history
//     historyX.pop();
//     historyX.unshift(mouseposition.x);
//     historyY.pop();
//     historyY.unshift(mouseposition.y);
//     // Update the points to correspond with history.
//     for (let i = 0; i < ropeSize; i++) {
//         const p = points[i];

//         // Smooth the curve with cubic interpolation to prevent sharp edges.
//         const ix = cubicInterpolation(historyX, i / ropeSize * historySize);
//         const iy = cubicInterpolation(historyY, i / ropeSize * historySize);

//         p.x = ix;
//         p.y = iy;
//     }
// });


// 초기 마우스 위치 설정
const initialPosition = { x: app.view.width / 2, y: app.view.height / 2 };
let mouseposition = { ...initialPosition };

app.view.addEventListener('mousemove', (event) => {
	mouseposition.x = event.clientX;
	mouseposition.y = event.clientY;
});

// Listen for animate update
app.ticker.add(() => {
    if (!mouseposition) return;

    // Update the mouse values to history
    historyX.pop();
    historyX.unshift(mouseposition.x);
    historyY.pop();
    historyY.unshift(mouseposition.y);
    // Update the points to correspond with history.
    for (let i = 0; i < ropeSize; i++) {
        const p = points[i];

        // Smooth the curve with cubic interpolation to prevent sharp edges.
        const ix = cubicInterpolation(historyX, i / ropeSize * historySize);
        const iy = cubicInterpolation(historyY, i / ropeSize * historySize);

        p.x = ix;
        p.y = iy;
    }
});


/**
 * Cubic interpolation based on https://github.com/osuushi/Smooth.js
 */
function clipInput(k, arr) {
    if (k < 0) k = 0;
    if (k > arr.length - 1) k = arr.length - 1;
    return arr[k];
}

function getTangent(k, factor, array) {
    return factor * (clipInput(k + 1, array) - clipInput(k - 1, array)) / 2;
}

function cubicInterpolation(array, t, tangentFactor) {
    if (tangentFactor == null) tangentFactor = 1;

    const k = Math.floor(t);
    const m = [getTangent(k, tangentFactor, array), getTangent(k + 1, tangentFactor, array)];
    const p = [clipInput(k, array), clipInput(k + 1, array)];
    t -= k;
    const t2 = t * t;
    const t3 = t * t2;
    return (2 * t3 - 3 * t2 + 1) * p[0] + (t3 - 2 * t2 + t) * m[0] + (-2 * t3 + 3 * t2) * p[1] + (t3 - t2) * m[1];
}
