import React, { useEffect } from 'react';
import * as PIXI from 'pixi.js';
import { useHistory } from 'react-router-dom';

let cellText;

function BackgroundAnimation() {
    const mainPageHistory = useHistory();
  useEffect(() => {

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
        const dude = PIXI.Sprite.from('/img/건-항아리.png');

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

    const roulette = PIXI.Sprite.from('/img/룰렛_배경X.png');
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
    const textStyle = new PIXI.TextStyle({
        fontFamily: 'Arial',
        fontSize: 36,
        fontWeight: 'bold',
        fill: ['#ffffff', '#00ff99'],
        stroke: '#4a1850',
        strokeThickness: 5,
    });

    const MyComponent = () => {
        const history = useHistory();

        const urls = [
          '/Inventory',
          '/itemshop1',
          '/itemshop2',
          'https://profile.intra.42.fr/',
          'https://profile.intra.42.fr/blocs/27/coalitions/85',
        ];

        // 텍스트 객체 배열을 생성합니다.
        const mainMeueTexts = [
            new PIXI.Text('인벤토리', textStyle),
            new PIXI.Text('상점', textStyle),
            new PIXI.Text('두근두근 가챠', textStyle),
            new PIXI.Text('42intra', textStyle),
            new PIXI.Text('coalition', textStyle),
        ];

        const onButtonClick = (index) => {
            const url = urls[index];
          if (url.startsWith('https://')) {
            window.open(url, '_blank');
          } else {
            history.push(url);
          }
        };

        for (let i = 0; i < mainMeueTexts.length; i++) {
          // 이전 인터랙션 정의와 동일
          mainMeueTexts[i]
            .on('pointerdown', function () {
              onButtonDown.call(this);
            })
            .on('pointerup', function () {
              onButtonUp.call(this);
              onButtonClick(i);
            })
            // 나머지 이벤트 핸들러 코드
        }
    };

    // 컨테이너를 생성하고 스테이지에 추가합니다.
    const container = new PIXI.Container();
    app.stage.addChild(container);

    // 회전 중심점을 설정합니다.
    container.x = rouletteX;
    container.y = rouletteY;



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
    // 원판 메뉴들이 돌아가는 코드

    app.ticker.add((delta) => {
        container.rotation += 0.002 * delta; // 회전 속도를 조절할 수 있습니다.
        for (let i = 0; i < mainMeueTexts.length; i++)
            mainMeueTexts[i].rotation -= 0.002 * delta;
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
    mainMeueTexts.forEach((text, index) => {
        text.anchor.set(0.5);
        text.x = Math.cos(index * 2 * Math.PI / mainMeueTexts.length) * roulette.y / 2;
        text.y = Math.sin(index * 2 * Math.PI / mainMeueTexts.length) * roulette.y / 2;
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


    // mouse trail
    // Get the texture for rope.
    const trailTexture = PIXI.Texture.from('/Users/kwak/42pub/sanghyol/myproject/projects/static/assets/img/노란커서.png');
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

    const profileScreenX = screenWidth * 0.03;
	const profileScreenY = screenHeight * 0.05;
	const profileScreenWidth = screenWidth * 0.25;
	const profileScreenHeight = screenHeight * 0.9;

    const profileSubTitleTexts = [
		'Profile',
		'Name',
		'Wallet',
		'Eval_point',
		'Money',
		'Level',
		'EXP',
	];

	const profileContentTexts = [
		'PROFILE',
        'NAME',
        'WALLET',
        'EVAL_POINT',
        'MONEY',
        'LEVEL',
        'EXP',
	];

    const profile_field = new PIXI.Graphics();







	profile_field.beginFill(0x2233BB)
	.lineStyle(4, 0xFFA00, 1)
	.drawRect(profileScreenX, profileScreenY, profileScreenWidth, profileScreenHeight)
	.endFill();

	profile_field.alpha = 0.5;

	app.stage.addChild(profile_field);
	////////////////////////////////
	app.ticker.add((delta) => {
		elapsed += delta;

		// 페이드 인 애니메이션 진행
		if (elapsed < fadeInDuration) {
			profile_field.alpha = (elapsed / fadeInDuration) * 0.5;
		} else {
			// 애니메이션 완료 후, ticker에서 제거
			app.ticker.remove();
		}
	});

	//////////////////////////////////

	const profileTitleStyle = new PIXI.TextStyle({
		fontFamily: 'Arial',
		fontSize: 36,
		fontWeight: 'bold',
		fill: ['#ffffff', '#00ff99'],
		stroke: '#ffffff',
		strokeThickness: 5,
			// 그림자 생성
		dropShadow: true,
		dropShadowColor: '#000000',
		dropShadowBlur: 4,
		dropShadowAngle: Math.PI / 6,
		dropShadowDistance: 6,
	});

	const profileContentStyle = new PIXI.TextStyle({
		fontFamily: 'Arial',
		fontSize: 24,
		fontWeight: 'bold',
		fill: ['#ffffff', '#00ff99'],
		// stroke: '#ffffff',
		strokeThickness: 5,
	});

	const profileSubTitleStyle = new PIXI.TextStyle({
		fontFamily: 'Arial',
		fontSize: 24,
		fontWeight: 'bold',
		fill: ['#ffffff', '#00ff99'],
		stroke: '#ffffff',
		strokeThickness: 5,
	});

	// API로 받아온 profile 정보를 출력해야함
	// 일단은 임시로 텍스트로 출력

	const title_profile = new PIXI.Text(profileContentTexts[0], {
		fontFamily: 'Arial',
		fontSize: 36,
		fontWeight: 'bold',
		fill: ['#ffffff', '#00ff99'],
		stroke: '#ffffff',
		strokeThickness: 5,
	});

	// profile Title
	// PIXI.Text가 profileScreenX 을 기준으로 중앙에 오도록 설정
	title_profile.x = profileScreenX + profileScreenWidth / 2 - title_profile.width / 2;
	title_profile.y = profileScreenY + 10;

	// my 아바타 이미지

	const myAvatarImg = new Image();
	myAvatarImg.src = '/img/아바타.png';

	myAvatarImg.onload = function() {
		console.log('img loaded');
		console.log(myAvatarImg.width, myAvatarImg.height);
	}
	const myAvatar = PIXI.Sprite.from(myAvatarImg);

	// 아바타 크기 설정
	var myAvatarScaleX = (profileScreenWidth / myAvatarImg.width) * 0.8;
	var myAvatarScaleY = (profileScreenHeight / myAvatarImg.height) * 0.3;
	myAvatar.scale.set(myAvatarScaleX, myAvatarScaleY);

	// 아바타의 픽셀 크기 계산
	const myAvatarWidth = myAvatarImg.width * myAvatarScaleX;
	const myAvatarHeight = myAvatarImg.height * myAvatarScaleY;

	// 아바타 위치 설정
	myAvatar.x = profileScreenX + profileScreenWidth / 2 - myAvatarImg.width * myAvatarScaleX / 2;
	myAvatar.y = title_profile.y + 10 + title_profile.height;

	app.stage.addChild(myAvatar);

	//////////////////////////////////

	// profile 내용

	// 표의 행과 열 수 설정
	const rows = profileContentTexts.length - 1;
	const cols = 2;

	// 표의 시작 위치 설정
	const tableX = myAvatar.x;
	const tableY = myAvatar.y + myAvatarHeight;

	// 표의 크기 설정
	const profileTableWidth = myAvatarWidth;
	const profileTableHeight = profileScreenHeight - tableY;

	// 셀 크기 설정
	const cellWidth = profileTableWidth / cols;
	const cellHeight = profileTableHeight / rows;


	// 표를 담을 컨테이너 생성
	const tableContainer = new PIXI.Container();
	app.stage.addChild(tableContainer);

	// 행과 열 순회
	for (let row = 0; row < rows; row++) {
		for (let col = 0; col < cols; col++) {
			// 셀 배경 생성 (사각형 그래픽)
			const cell = new PIXI.Graphics();
			cell.beginFill(0xFFFFFF * Math.random()) // 무작위 색상
				.drawRect(0, 0, cellWidth, cellHeight)
				.endFill();

			// 셀 위치 설정
			cell.x = tableX + col * cellWidth;
			cell.y = tableY + row * cellHeight + 10;
			tableContainer.addChild(cell);

			// 셀에 텍스트 추가
			const profileSubTitleTextStyle = new PIXI.TextStyle({
				fontFamily: 'Arial',
				fontSize: 20,
				fontWeight: 'bold',
				fill: '#222222',
			});
			const profileContentTextStyle = new PIXI.TextStyle({
				fontFamily: 'Arial',
				fontSize: 14,
				fontWeight: 'bold',
				fill: '#777777',
			});
			if (col == 0)
			    cellText = new PIXI.Text(profileSubTitleTexts[row + 1], profileSubTitleTextStyle);
			else
				cellText = new PIXI.Text(profileContentTexts[row + 1], profileContentTextStyle);
			cellText.anchor.set(0.5, 0.5);
			cellText.x = cellWidth / 2;
			cellText.y = cellHeight / 2;
			cell.addChild(cellText);
		}
	}


	app.stage.addChild(title_profile);


    //////////////////////////////////////////
    //  hane_banner
    //////////////////////////////////////////

    const haneBannerScreenWidth =  profileScreenWidth;
    const haneBannerScreenHeight = screenHeight - profileScreenHeight - 20;
    const haneBannerScreenX =screenWidth * (1 - 0.03) - profileScreenWidth;
    const haneBannerScreenY = profileScreenY;
    // 24hane 배너 들어가는 공간
    const haneBannerField = new PIXI.Graphics();

    console.log(haneBannerScreenX, haneBannerScreenY, haneBannerScreenWidth, haneBannerScreenHeight);

    haneBannerField.beginFill(0x2233BB)
    .lineStyle(4, 0xFFA00, 1)
    .drawRect(haneBannerScreenX, haneBannerScreenY, haneBannerScreenWidth, haneBannerScreenHeight)
    .endFill();

    haneBannerField.alpha = 0.5;

    // 텍스트를 추가합니트
    const haneBannerTextStyle = new PIXI.TextStyle({
        fontFamily: 'Arial',
        fontSize: 30,
        fontWeight: 'bold',
        fill: ['#ffffff', '#00ff99'],
        stroke: '#000000',
        strokeThickness: 5,
    });

    const haneBannerText = new PIXI.Text('3월 출입시간 : 168:40:59', haneBannerTextStyle);
    haneBannerText.x = haneBannerScreenX + 10;
    haneBannerText.y = haneBannerScreenY;

    app.stage.addChild(haneBannerField);
    app.stage.addChild(haneBannerText);



    //////////////////////////////////////////
    app.ticker.add((delta) => {
        elapsed += delta;

        // 페이드 인 애니메이션 진행
        if (elapsed < fadeInDuration) {
            haneBannerField.alpha = (elapsed / fadeInDuration) * 0.5;
        } else {
            // 애니메이션 완료 후, ticker에서 제거
            app.ticker.remove();
        }
    });

    ///////////////////////////////////////////
    //  main_board.js
    ///////////////////////////////////////////

    const boardScreenX = haneBannerScreenX;
    const boardScreenY = screenHeight * 0.15;
    const boardScreenWidth =  profileScreenWidth;
    const boardScreenHeight =  profileScreenHeight - haneBannerScreenHeight - 10;
    // 간단 랭킹 정보 들어가는 공간
    const board_field = new PIXI.Graphics();

    board_field.beginFill(0x2233BB)
    .lineStyle(4, 0xFFA00, 1)
    .drawRect(boardScreenX, boardScreenY, boardScreenWidth, boardScreenHeight)
    .endFill();

    board_field.alpha = 0.5;

    app.stage.addChild(board_field);
    //////////////////////////////////////////
    app.ticker.add((delta) => {
        elapsed += delta;

        // 페이드 인 애니메이션 진행
        if (elapsed < fadeInDuration) {
            board_field.alpha = (elapsed / fadeInDuration) * 0.5;
        } else {
            // 애니메이션 완료 후, ticker에서 제거
            app.ticker.remove();
        }
    });

    ///////////////////////////////////////////
    //  rank_board.js
    ///////////////////////////////////////////


    const rankBoardScreenWidth = screenWidth - profileScreenWidth * 2 - 110;
    const rankBoardScreenHeight = screenHeight - boardScreenHeight;
    const rankBoardScreenX = profileScreenX + profileScreenWidth + 10;
    const rankBoardScreenY = haneBannerScreenY;
    // 24hane 배너 들어가는 공간
    const rankBoardField = new PIXI.Graphics();

    console.log(rankBoardScreenX, rankBoardScreenY, rankBoardScreenWidth, rankBoardScreenHeight);

    rankBoardField.beginFill(0x2233BB)
    .lineStyle(4, 0xFFA00, 1)
    .drawRect(rankBoardScreenX, rankBoardScreenY, rankBoardScreenWidth, rankBoardScreenHeight)
    .endFill();

    rankBoardField.alpha = 0.5;

    // 텍스트를 추가합니트
    const rankBoardTextStyle = new PIXI.TextStyle({
        fontFamily: 'Arial',
        fontSize: 60,
        fontWeight: 'bold',
        fill: ['#ffffff', '#00ff99'],
        stroke: '#ffffff',
        strokeThickness: 5,
        // 그림자 생성
        dropShadow: true,
        dropShadowColor: '#000000',
        dropShadowBlur: 4,
        dropShadowAngle: Math.PI / 6,
        dropShadowDistance: 6,
    });

    const rankBoardText = new PIXI.Text('RANK', rankBoardTextStyle);
    rankBoardText.x = (rankBoardScreenX * 2 + rankBoardScreenWidth) / 2 - rankBoardText.width / 2;
    rankBoardText.y = rankBoardScreenY - 10;

    app.stage.addChild(rankBoardField);
    app.stage.addChild(rankBoardText);





    //////////////////////////////////////////
    app.ticker.add((delta) => {
        elapsed += delta;

        // 페이드 인 애니메이션 진행
        if (elapsed < fadeInDuration) {
            rankBoardField.alpha = (elapsed / fadeInDuration) * 0.5;
        } else {
            // 애니메이션 완료 후, ticker에서 제거
            app.ticker.remove();
            // const fill_board_script = document.createElement('script');
            // fill_board_script.src = './main_board.js';
            // document.body.appendChild(fill_board_script);
        }
    });




  }, []);

  return <div id="background-animation"></div>;
}

export default BackgroundAnimation;
