import React, { useState } from 'react';
import './Inventory.css';

const sampleItems = [
    { name: '건-항아리', count: 10, description: '건-항아리', img: '건-항아리.png' },
    { name: '곤-항아리', count: 5, description: '곤-항아리', img: '곤-항아리.png' },
    { name: '감-항아리', count: 5, description: '감-항아리', img: '감-항아리.png' },
    { name: '리-항아리', count: 5, description: '리-항아리', img: '리-항아리.png' },
    { name: '찬란한-건-항아리', count: 5, description: '찬란한-건-항아리', img: '찬란한-건-항아리.png' },
    { name: '찬란한-곤-항아리', count: 5, description: '찬란한-곤-항아리', img: '찬란한-곤-항아리.png' },
    { name: '찬란한-감-항아리', count: 5, description: '찬란한-감-항아리', img: '찬란한-감-항아리.png' },
    { name: '찬란한-리-항아리', count: 5, description: '찬란한-리-항아리', img: '찬란한-리-항아리.png' },
    { name: '교복모자', count: 10, description: '교복모자', img: '교복모자.png' },
    { name: '교복신발', count: 10, description: '교복신발', img: '교복신발.png' },
    { name: '교복상의', count: 10, description: '교복상의', img: '교복상의.png' },
    { name: '그림자검', count: 10, description: '그림자검', img: '그림자검.png' },
    { name: '루시드드림', count: 10, description: '루시드드림', img: '루시드드림.png' },
    { name: '루시드실크헷', count: 10, description: '루시드실크헷', img: '루시드실크헷.png' },
    { name: '분필', count: 10, description: '분필', img: '분필.png' },
    { name: '살랑살랑', count: 10, description: '살랑살랑', img: '살랑살랑.png' },
    { name: '움직이는 이미지', count: 10, description: '움직이는 이미지', img: '움직이는 이미지.gif' },
    // ...
];

const Inventory = () => {
    const [selectedItem, setSelectedItem] = useState(null);
    const [altarionPoints, setAltarionPoints] = useState(100);
    const [enhancementLevel, setEnhancementLevel] = useState(0);
    const [showMessage, setShowMessage] = useState(false);
    const [message, setMessage] = useState("");

    const handleItemClick = (item) => {
        setSelectedItem(item);
        setEnhancementLevel(0);
    };

    const enhanceItem = () => {
        const successRate = enhancementLevel < 3 ? 1 : 1 - (enhancementLevel - 2) * 0.1;

        const isSuccess = Math.random() <= successRate;
        setMessage(isSuccess ? "성공" : "실패!");
        setShowMessage(true);

        if (isSuccess) {
            setEnhancementLevel(enhancementLevel + 1);
        }
        setAltarionPoints(altarionPoints - 1);

        setTimeout(() => {
            setShowMessage(false);
        }, 1500);
    };

    return (
        <div className="inventory">
            <div className="item-detail">
                {selectedItem && (
                    <>
                        <img src={`${process.env.PUBLIC_URL}/img/${selectedItem.img}`} alt={selectedItem.name} />
                        <h2>{selectedItem.name}</h2>
                        <p>{selectedItem.description}</p>
                        <p>현재 강화 수치: {enhancementLevel}</p>
                        {showMessage && <div className="enhancement-message">{message}</div>}
                        <div className="item-info">
                            <p>알타리안 포인트: {altarionPoints}</p>
                            <p>평가 포인트: 0</p>
                            <button onClick={enhanceItem}>강화</button>
                        </div>
                    </>
                )}
            </div>
            <div className="item-list">
                {sampleItems.map((item, index) => (
                    <div key={index} className="item" onClick={() => handleItemClick(item)}>
                        <img src={`${process.env.PUBLIC_URL}/img/${item.img}`} alt={item.name} />
                        <span>{item.name}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Inventory;
