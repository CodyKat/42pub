import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './Roulette.css';

const Roulette = () => {
    const [rotateDeg, setRotateDeg] = useState(0);
    const [running, setRunning] = useState(false);
    const [results, setResults] = useState([]);
    const { jarName } = useParams();

    const base_url = 'https://maplestory.io/api/KMST/1150/item/';
    const item_ranges = [
        range(20000, 20500),
        range(30000, 30500),
        range(1060000, 1060800),
        range(1042000, 1042026),
        range(1702000, 1702010),
    ];

    function range(start, end) {
        return Array.from({ length: end - start }, (v, k) => k + start);
    }

    const fetchRandomItems = async () => {
        const fetchedItems = [];

        for (let i = 0; i < 10; i++) {
            try {
                const random_range = item_ranges[Math.floor(Math.random() * item_ranges.length)];
                const item_id = random_range[Math.floor(Math.random() * random_range.length)];
                const url = `${base_url}${item_id}`;
                const response = await fetch(url);
                const data = await response.json();

                if (data) {
                    fetchedItems.push({
                        id: item_id,
                        name: data.description?.name || 'Unknown',
                        description: data.description?.description || 'Unknown',
                        icon: `${base_url}${item_id}/icon`,
                    });
                } else {
                    fetchedItems.push('꽝입니다');
                }
            } catch (error) {
                console.error('Error fetching items:', error);
            }
        }

        setResults(fetchedItems);
    };

    const spinWheel = () => {
        if (running) return;

        const randomDeg = rotateDeg + 7200;
        setRunning(true);
        setResults([]);

        setTimeout(() => {
            setRunning(false);
            fetchRandomItems();
        }, 1001);

        setRotateDeg(randomDeg);
    };

    return (
        <div className="App">
            <div className="roulette-wrapper">
                <div className="results-container">
                    {results.map((result, index) => (
                        <div key={index} className="result-item">
                            {result && typeof result === 'object' ? (
                                <>
                                    <div
                                        className="result-img"
                                        style={{
                                            backgroundImage: `url("${result.icon}")`,
                                        }}
                                    ></div>
                                    <div className="result-name">{result.name}</div>
                                </>
                            ) : (
                                <div className="result-text">{result}</div>
                            )}
                        </div>
                    ))}
                </div>
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
