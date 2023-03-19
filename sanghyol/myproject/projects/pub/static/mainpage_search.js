const mainPageSearchScreenWidth = screenWidth - profileScreenWidth * 2 - 110;
const mainPageSearchScreenHeight = screenHeight - profileScreenHeight - ranmainPageSearchScreenHeight - 20;
const mainPageSearchScreenX = profileScreenX + profileScreenWidth + 10;
const mainPageSearchScreenY = 50;
// 24hane 배너 들어가는 공간
const mainPageSearch = new PIXI.Graphics();

console.log(ranmainPageSearchScreenX, ranmainPageSearchScreenY, ranmainPageSearchScreenWidth, ranmainPageSearchScreenHeight);

mainPageSearch.beginFill(0x2233BB)
.lineStyle(4, 0xFFA00, 1)
.drawRect(ranmainPageSearchScreenX, ranmainPageSearchScreenY, ranmainPageSearchScreenWidth, ranmainPageSearchScreenHeight)
.endFill();

mainPageSearch.alpha = 0.5;

// 텍스트를 추가합니트
const ranmainPageSearchTextStyle = new PIXI.TextStyle({
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

const ranmainPageSearchText = new PIXI.Text('RANK', ranmainPageSearchTextStyle);
ranmainPageSearchText.x = (ranmainPageSearchScreenX * 2 + ranmainPageSearchScreenWidth) / 2 - ranmainPageSearchText.width / 2;
ranmainPageSearchText.y = ranmainPageSearchScreenY - 10;

ranmainPageSearchField.addChild(ranmainPageSearchText);
app.stage.addChild(ranmainPageSearchField);





//////////////////////////////////////////
app.ticker.add((delta) => {
	elapsed += delta;

	// 페이드 인 애니메이션 진행
	if (elapsed < fadeInDuration) {
		ranmainPageSearchField.alpha = (elapsed / fadeInDuration) * 0.5;
	} else {
		// 애니메이션 완료 후, ticker에서 제거
		app.ticker.remove();
	}
});

///////////////////////////////////////////


//mainpage_search.js 스트립트를 추가합니다
const mainpage_search = document.createElement('script');
mainpage_search.src = 'static/mainpage_search.js';
document.body.appendChild(mainpage_search);
