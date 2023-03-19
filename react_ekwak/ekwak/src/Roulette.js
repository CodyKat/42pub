import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './Roulette.css';

const Roulette = () => {
    const [rotateDeg, setRotateDeg] = useState(0);
    const [running, setRunning] = useState(false);
    const [result, setResult] = useState(null);
    const [items, setItems] = useState([]);
    const { jarName } = useParams();

    useEffect(() => {
        setResult(null);
        fetchItems();
    }, [jarName]);

    const fetchItems = async () => {
        try {
            const response = await fetch('/api/items');
            const data = await response.json();
            setItems(data);
        } catch (error) {
            console.error('Error fetching items:', error);
        }
    };

    const getRandomItem = () => {
        if (items.length === 0) return '꽝입니다';

        const itemIndex = Math.floor(Math.random() * items.length);
        return items[itemIndex].icon;
    };

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
                {result && result !== '꽝입니다' ? (
                    <div
                        className="result-img"
                        style={{
                            backgroundImage: `url("${result}.png")`,
                        }}
                    ></div>
                ) : (
                    <div className="result-text">{result}</div>
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
