import React, { useState, useEffect } from 'react';
import './Inventory.css';

const Inventory = () => {
    const [inventoryItems, setInventoryItems] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);
    const [altarionPoints, setAltarionPoints] = useState(100);
    const [showMessage, setShowMessage] = useState(false);
    const [message, setMessage] = useState("");

    useEffect(() => {
        fetch('http://127.0.0.1:5000/api/inventory')
            .then(response => response.json())
            .then(data => setInventoryItems(data));
    }, []);

    const handleItemClick = (item) => {
        setSelectedItem(item);
    };

    const enhanceItem = async () => {
        try {
            const response = await fetch('http://127.0.0.1:5000/api/inventory/enhance', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id: selectedItem.id }),
            });

            const result = await response.json();
            setMessage(result.success ? "성공" : "실패!");
            setShowMessage(true);

            if (result.success) {
                setSelectedItem({ ...selectedItem, enhancementLevel: result.enhancementLevel });
            }
            setAltarionPoints(result.altarionPoints);

            setTimeout(() => {
                setShowMessage(false);
            }, 1500);
        } catch (error) {
            console.error(error);
            alert('Error enhancing the item.');
        }
    };

    const toggleMount = async () => {
        try {
            const response = await fetch('http://127.0.0.1:5000/api/inventory/toggle-mount', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id: selectedItem.id }),
            });

            const result = await response.json();
            setSelectedItem({ ...selectedItem, mounted: result.mounted });
        } catch (error) {
            console.error(error);
            alert('Error toggling mount status.');
        }
    };

    const showroomItems = inventoryItems.filter(item => item.mounted);

    const [characterImage, setCharacterImage] = useState('');

    const showCharacter = async () => {
        const items = showroomItems.map(item => ({
            itemId: item.itemId,
            version: '1150',
            region: 'KMST',
        }));

        const response = await fetch(
            `http://127.0.0.1:5000/api/character-image?items=${encodeURIComponent(JSON.stringify(items))}`
        );

        const result = await response.json();
        //const characterImage = result.image_url;
        //window.open(characterImage, '_blank');
        setCharacterImage(result.image_url);
    };
    // Add this button to the "showroom" div
    

    return (
        <div className="inventory">
            <div className='showroom'>
                {/* 여기에 이미지를 띄운다 */}
                {showroomItems.map((item, index) => (
                    <img key={index} src={item.icon} alt={item.name} />
                    ))}
                <button onClick={showCharacter}>Show</button>
                {characterImage && <img src={characterImage} alt="Character" />}
            </div>
            <div className="item-detail">
                {selectedItem && (
                    <>
                        <img src={selectedItem.icon} alt={selectedItem.name} />
                        <h2>{selectedItem.name}</h2>
                        <p>현재 강화 수치: {selectedItem.enhancementLevel}</p>
                        {showMessage && <div className="enhancement-message">{message}</div>}
                        <div className="item-info">
                            <p>알타리안 포인트: {altarionPoints}</p>
                            <p>평가 포인트: 0</p>
                            <button onClick={enhanceItem}>강화</button>
                            <button onClick={toggleMount}>{selectedItem.mounted ? '장착 해제' : '장착'}</button>
                        </div>
                    </>
                )}
            </div>
            <div className="item-list">
                {inventoryItems.map((item, index) => (
                    <div key={index} className="item" onClick={() => handleItemClick(item)}>
                        <img src={item.icon} alt={item.name} />
                        <span>{item.name}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Inventory;
