
// 간단 랭킹 정보 들어가는 공간

const rank_field = new Graphics();
rank_field.beginFill(0x2233BB)
.lineStyle(4, 0xFFA00, 1)
.drawRect(screenWidth * (1 - 0.03 - 0.25), screenHeight * 0.15, screenWidth * 0.25, screenHeight * 0.8)
.endFill();

rank_field.alpha = 0.5;

app.stage.addChild(rank_field);

//////////////////////////////////////////

app.ticker.add((delta) => {
	elapsed += delta;

	// 페이드 인 애니메이션 진행
	if (elapsed < fadeInDuration) {
		rank_field.alpha = (elapsed / fadeInDuration) * 0.5;
	} else {
		// 애니메이션 완료 후, ticker에서 제거
		app.ticker.remove();
    	const fill_rank_script = document.createElement('script');
    	fill_rank_script.src = './fill_rank.js';
    	document.body.appendChild(fill_rank_script);
	}
});
///////////////////////////////////////////

const rankScreenX = screenWidth * 0.03;
const rankScreenY = screenHeight * 0.15;
