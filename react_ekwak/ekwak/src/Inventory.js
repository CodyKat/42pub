import React, { useState } from 'react';
import './Inventory.css';

const sampleItems = [
    {id: 1, name: '건-항아리', img: '건-항아리.png', enhancementLevel: 0, category: '', subCategory: '', getbool: false },
    {id: 1, name: '곤-항아리', img: '곤-항아리.png', enhancementLevel: 0, category: '', subCategory: '', getbool: false },
    {id: 1, name: '감-항아리', img: '감-항아리.png', enhancementLevel: 0, category: '', subCategory: '', getbool: false },
    {id: 1, name: '리-항아리', img: '리-항아리.png', enhancementLevel: 0, category: '', subCategory: '', getbool: false },
    {id: 1, name: '찬란한-건-항아리', img: '찬란한-건-항아리.png', enhancementLevel: 0, category: '', subCategory: '', getbool: false },
    {id: 1, name: '찬란한-곤-항아리', img: '찬란한-곤-항아리.png', enhancementLevel: 0, category: '', subCategory: '', getbool: false },
    {id: 1, name: '찬란한-감-항아리', img: '찬란한-감-항아리.png', enhancementLevel: 0, category: '', subCategory: '', getbool: false },
    {id: 1, name: '찬란한-리-항아리', img: '찬란한-리-항아리.png', enhancementLevel: 0, category: '', subCategory: '', getbool: false },
    {id: 1, name: '교복모자', img: '교복모자.png', enhancementLevel: 0, category: '', subCategory: '', getbool: false },
    {id: 1, name: '교복신발', img: '교복신발.png', enhancementLevel: 0, category: '', subCategory: '', getbool: false },
    {id: 1, name: '교복상의', img: '교복상의.png', enhancementLevel: 0, category: '', subCategory: '', getbool: false },
    {id: 1, name: '그림자검', img: '그림자검.png', enhancementLevel: 0, category: '', subCategory: '', getbool: false },
    {id: 1, name: '루시드드림', img: '루시드드림.png', enhancementLevel: 0, category: '', subCategory: '', getbool: false },
    {id: 1, name: '루시드실크헷', img: '루시드실크헷.png', enhancementLevel: 0, category: '', subCategory: '', getbool: false },
    {id: 1, name: '분필', img: '분필.png', enhancementLevel: 0, category: '', subCategory: '', getbool: false },
    {id: 1, name: '살랑살랑',  img: '살랑살랑.png', enhancementLevel: 0, category: '', subCategory: '', getbool: false },
    {id: 1, name: '움직이는 이미지', img: '움직이는 이미지.gif', enhancementLevel: 0, category: '', subCategory: '', getbool: false },
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
