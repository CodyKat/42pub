const boardScreenX = screenWidth * (1 - 0.03) - profileScreenWidth;
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

//hane_banner.js 스트립트를 추가합니다
const haneBannerScript = document.createElement('script');
haneBannerScript.src = 'static/hane_banner.js';
document.body.appendChild(haneBannerScript);
