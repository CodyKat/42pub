const profileScreenX = screenWidth * 0.03;
const profileScreenY = screenHeight * 0.15;
const profileScreenWidth = screenWidth * 0.25;
const profileScreenHeight = screenHeight * 0.8;
// 간단 프로필 정보 들어가는 공간
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


const profileSubTitleTexts = [
	'Profile',
	'Name',
	'Coalition',
	'Rank',
	'Wallet',
	'Eval_point',
];

const profileContentTexts = [
	'NULL',
	'jaemjeon',
	'GUN',
	'1',
	'1000',
	'20',
];

const profileTitleStyle = new PIXI.TextStyle({
	fontFamily: 'Arial',
	fontSize: 36,
	fontWeight: 'bold',
	fill: ['#ffffff', '#00ff99'],
	stroke: '#ffffff',
	strokeThickness: 5,
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
myAvatarImg.src = 'assets/img/아바타.png';

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




// title_profile.x = profileScreenX + profileScreenWidth / 2;
// title_profile.y = profileScreenY + 10;

app.stage.addChild(title_profile);
