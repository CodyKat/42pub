const screenX = screenWidth * 0.03;
const screenY = screenHeight * 0.15;

const texts = [
	'Profile',
	'Name',
	'Coalition',
	'Rank',
	'Wallet',
	'Eval_point',
];

const Title_profile = new PIXI.Text(texts[0], {
	fontFamily: 'Arial',
	fontSize: 36,
	fontWeight: 'bold',
	fill: ['#ffffff', '#00ff99'],
	stroke: '#4a1850',
	strokeThickness: 5,
});
