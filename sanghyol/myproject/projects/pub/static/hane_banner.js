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


//mainBoard.js 스트립트를 추가합니다
const mainBoard = document.createElement('script');
mainBoard.src = 'static/main_board.js';
document.body.appendChild(mainBoard);
