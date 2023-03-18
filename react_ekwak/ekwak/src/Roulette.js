import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './Roulette.css';

function getRandomValue() {
    const randomNumber = Math.random();
    if (randomNumber < 0.9) {
        return 0;
    } else if (randomNumber < 0.95) {
        return 1;
    } else if (randomNumber < 0.98) {
        return 2;
    } else if (randomNumber < 0.995) {
        return 3;
    } else {
        return 4;
    }
}

function getRandomItem() {
    const items = [
        ['깨진항아리1', '깨진항아리2'],
        ['교복모자', '교복상의'],
        ['교복신발', '그림자검', '루시드드림'],
        ['루시드실크헷', '분필', '살랑살랑'],
        ['찬란한-건-항아리', '찬란한-리-항아리', '찬란한-감-항아리', '찬란한-곤-항아리'],
    ];

    const valueIndex = getRandomValue();
    const itemGroup = items[valueIndex];
    const itemIndex = Math.floor(Math.random() * itemGroup.length);

    return itemGroup[itemIndex];
}

const Roulette = () => {
    const [rotateDeg, setRotateDeg] = useState(0);
    const [running, setRunning] = useState(false);
    const [result, setResult] = useState(null);
    const { jarName } = useParams();

    useEffect(() => {
        setResult(null);
    }, [jarName]);

    const spinWheel = () => {
        if (running) return;

        const randomDeg = rotateDeg + 7200;
        setRunning(true);
        setResult(null);

        setTimeout(() => {
            setRunning(false);
            setResult(getRandomItem());
        }, 1001);

        setRotateDeg(randomDeg);
    };

    return (
        <div className="App">
            <div className="roulette-wrapper">
                {result && (
                    <div
                        className="result-img"
                        style={{
                            backgroundImage: `url("${process.env.PUBLIC_URL}/img/${result}.png")`,
                        }}
                    ></div>
                )}
                <div className="roulette-container">
                    <div
                        className="roulette-wheel"
                        style={{
                            transform: `rotate(${rotateDeg}deg)`,
                            backgroundImage: `url("${process.env.PUBLIC_URL}/img/${jarName}-항아리.png")`,
                        }}
                    ></div>
                </div>
                <button onClick={spinWheel} className="spin-button">
                    항아리까기!
                </button>
            </div>
        </div>
    );
};

export default Roulette;
