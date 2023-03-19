const rankBoardScreenWidth = screenWidth - profileScreenWidth * 2 - 110;
const rankBoardScreenHeight = screenHeight - profileScreenHeight - 20;
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

rankBoardField.addChild(rankBoardText);
app.stage.addChild(rankBoardField);





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
    	// fill_board_script.src = './fill_board.js';
    	// document.body.appendChild(fill_board_script);
	}
});

///////////////////////////////////////////


// main page의 search 부분은 ekwak님이 만드신 search 부분을 가져와서 사용합니다.
//mainpage_search.js 스트립트를 추가합니다
// const mainpage_search = document.createElement('script');
// mainpage_search.src = 'static/mainpage_search.js';
// document.body.appendChild(mainpage_search);
