import React, { useState } from 'react';
import './Inventory.css';

const sampleItems = [
    { id: 1, name: '건-항아리', count: 10, description: '건-항아리', img: '건-항아리.png' },
    { id: 2, name: '곤-항아리', count: 5, description: '곤-항아리', img: '곤-항아리.png' },
	{ id: 3, name: '감-항아리', count: 5, description: '감-항아리', img: '감-항아리.png' },
	{ id: 4, name: '리-항아리', count: 5, description: '리-항아리', img: '리-항아리.png' },
	{ id: 5, name: '찬란한-건-항아리', count: 5, description: '찬란한-건-항아리', img: '찬란한-건-항아리.png' },
	{ id: 1, name: '건-항아리', count: 10, description: '건-항아리', img: '건-항아리.png' },
    { id: 2, name: '곤-항아리', count: 5, description: '곤-항아리', img: '곤-항아리.png' },
	{ id: 3, name: '감-항아리', count: 5, description: '감-항아리', img: '감-항아리.png' },
	{ id: 4, name: '리-항아리', count: 5, description: '리-항아리', img: '리-항아리.png' },
	{ id: 5, name: '찬란한-건-항아리', count: 5, description: '찬란한-건-항아리', img: '찬란한-건-항아리.png' },
	{ id: 1, name: '건-항아리', count: 10, description: '건-항아리', img: '건-항아리.png' },
    { id: 2, name: '곤-항아리', count: 5, description: '곤-항아리', img: '곤-항아리.png' },
	{ id: 3, name: '감-항아리', count: 5, description: '감-항아리', img: '감-항아리.png' },
	{ id: 4, name: '리-항아리', count: 5, description: '리-항아리', img: '리-항아리.png' },
	{ id: 5, name: '찬란한-건-항아리', count: 5, description: '찬란한-건-항아리', img: '찬란한-건-항아리.png' },
	{ id: 1, name: '건-항아리', count: 10, description: '건-항아리', img: '건-항아리.png' },
    { id: 2, name: '곤-항아리', count: 5, description: '곤-항아리', img: '곤-항아리.png' },
	{ id: 3, name: '감-항아리', count: 5, description: '감-항아리', img: '감-항아리.png' },
	{ id: 4, name: '리-항아리', count: 5, description: '리-항아리', img: '리-항아리.png' },
	{ id: 5, name: '찬란한-건-항아리', count: 5, description: '찬란한-건-항아리', img: '찬란한-건-항아리.png' },
    { id: 1, name: '건-항아리', count: 10, description: '건-항아리', img: '건-항아리.png' },
    { id: 2, name: '곤-항아리', count: 5, description: '곤-항아리', img: '곤-항아리.png' },
	{ id: 3, name: '감-항아리', count: 5, description: '감-항아리', img: '감-항아리.png' },
	{ id: 4, name: '리-항아리', count: 5, description: '리-항아리', img: '리-항아리.png' },
	{ id: 5, name: '찬란한-건-항아리', count: 5, description: '찬란한-건-항아리', img: '찬란한-건-항아리.png' },
	{ id: 1, name: '건-항아리', count: 10, description: '건-항아리', img: '건-항아리.png' },
    { id: 2, name: '곤-항아리', count: 5, description: '곤-항아리', img: '곤-항아리.png' },
	{ id: 3, name: '감-항아리', count: 5, description: '감-항아리', img: '감-항아리.png' },
	{ id: 4, name: '리-항아리', count: 5, description: '리-항아리', img: '리-항아리.png' },
	{ id: 5, name: '찬란한-건-항아리', count: 5, description: '찬란한-건-항아리', img: '찬란한-건-항아리.png' },
	{ id: 1, name: '건-항아리', count: 10, description: '건-항아리', img: '건-항아리.png' },
    { id: 2, name: '곤-항아리', count: 5, description: '곤-항아리', img: '곤-항아리.png' },
	{ id: 3, name: '감-항아리', count: 5, description: '감-항아리', img: '감-항아리.png' },
	{ id: 4, name: '리-항아리', count: 5, description: '리-항아리', img: '리-항아리.png' },
	{ id: 5, name: '찬란한-건-항아리', count: 5, description: '찬란한-건-항아리', img: '찬란한-건-항아리.png' },
	{ id: 1, name: '건-항아리', count: 10, description: '건-항아리', img: '건-항아리.png' },
    { id: 2, name: '곤-항아리', count: 5, description: '곤-항아리', img: '곤-항아리.png' },
	{ id: 3, name: '감-항아리', count: 5, description: '감-항아리', img: '감-항아리.png' },
	{ id: 4, name: '리-항아리', count: 5, description: '리-항아리', img: '리-항아리.png' },
	{ id: 5, name: '찬란한-건-항아리', count: 5, description: '찬란한-건-항아리', img: '찬란한-건-항아리.png' },
    { id: 1, name: '건-항아리', count: 10, description: '건-항아리', img: '건-항아리.png' },
    { id: 2, name: '곤-항아리', count: 5, description: '곤-항아리', img: '곤-항아리.png' },
	{ id: 3, name: '감-항아리', count: 5, description: '감-항아리', img: '감-항아리.png' },
	{ id: 4, name: '리-항아리', count: 5, description: '리-항아리', img: '리-항아리.png' },
	{ id: 5, name: '찬란한-건-항아리', count: 5, description: '찬란한-건-항아리', img: '찬란한-건-항아리.png' },
	{ id: 1, name: '건-항아리', count: 10, description: '건-항아리', img: '건-항아리.png' },
    { id: 2, name: '곤-항아리', count: 5, description: '곤-항아리', img: '곤-항아리.png' },
	{ id: 3, name: '감-항아리', count: 5, description: '감-항아리', img: '감-항아리.png' },
	{ id: 4, name: '리-항아리', count: 5, description: '리-항아리', img: '리-항아리.png' },
	{ id: 5, name: '찬란한-건-항아리', count: 5, description: '찬란한-건-항아리', img: '찬란한-건-항아리.png' },
	{ id: 1, name: '건-항아리', count: 10, description: '건-항아리', img: '건-항아리.png' },
    { id: 2, name: '곤-항아리', count: 5, description: '곤-항아리', img: '곤-항아리.png' },
	{ id: 3, name: '감-항아리', count: 5, description: '감-항아리', img: '감-항아리.png' },
	{ id: 4, name: '리-항아리', count: 5, description: '리-항아리', img: '리-항아리.png' },
	{ id: 5, name: '찬란한-건-항아리', count: 5, description: '찬란한-건-항아리', img: '찬란한-건-항아리.png' },
	{ id: 1, name: '건-항아리', count: 10, description: '건-항아리', img: '건-항아리.png' },
    { id: 2, name: '곤-항아리', count: 5, description: '곤-항아리', img: '곤-항아리.png' },
	{ id: 3, name: '감-항아리', count: 5, description: '감-항아리', img: '감-항아리.png' },
	{ id: 4, name: '리-항아리', count: 5, description: '리-항아리', img: '리-항아리.png' },
	{ id: 5, name: '찬란한-건-항아리', count: 5, description: '찬란한-건-항아리', img: '찬란한-건-항아리.png' },
    { id: 1, name: '건-항아리', count: 10, description: '건-항아리', img: '건-항아리.png' },
    { id: 2, name: '곤-항아리', count: 5, description: '곤-항아리', img: '곤-항아리.png' },
	{ id: 3, name: '감-항아리', count: 5, description: '감-항아리', img: '감-항아리.png' },
	{ id: 4, name: '리-항아리', count: 5, description: '리-항아리', img: '리-항아리.png' },
	{ id: 5, name: '찬란한-건-항아리', count: 5, description: '찬란한-건-항아리', img: '찬란한-건-항아리.png' },
	{ id: 1, name: '건-항아리', count: 10, description: '건-항아리', img: '건-항아리.png' },
    { id: 2, name: '곤-항아리', count: 5, description: '곤-항아리', img: '곤-항아리.png' },
	{ id: 3, name: '감-항아리', count: 5, description: '감-항아리', img: '감-항아리.png' },
	{ id: 4, name: '리-항아리', count: 5, description: '리-항아리', img: '리-항아리.png' },
	{ id: 5, name: '찬란한-건-항아리', count: 5, description: '찬란한-건-항아리', img: '찬란한-건-항아리.png' },
	{ id: 1, name: '건-항아리', count: 10, description: '건-항아리', img: '건-항아리.png' },
    { id: 2, name: '곤-항아리', count: 5, description: '곤-항아리', img: '곤-항아리.png' },
	{ id: 3, name: '감-항아리', count: 5, description: '감-항아리', img: '감-항아리.png' },
	{ id: 4, name: '리-항아리', count: 5, description: '리-항아리', img: '리-항아리.png' },
	{ id: 5, name: '찬란한-건-항아리', count: 5, description: '찬란한-건-항아리', img: '찬란한-건-항아리.png' },
	{ id: 1, name: '건-항아리', count: 10, description: '건-항아리', img: '건-항아리.png' },
    { id: 2, name: '곤-항아리', count: 5, description: '곤-항아리', img: '곤-항아리.png' },
	{ id: 3, name: '감-항아리', count: 5, description: '감-항아리', img: '감-항아리.png' },
	{ id: 4, name: '리-항아리', count: 5, description: '리-항아리', img: '리-항아리.png' },
	{ id: 5, name: '찬란한-건-항아리', count: 5, description: '찬란한-건-항아리', img: '찬란한-건-항아리.png' },
    { id: 1, name: '건-항아리', count: 10, description: '건-항아리', img: '건-항아리.png' },
    { id: 2, name: '곤-항아리', count: 5, description: '곤-항아리', img: '곤-항아리.png' },
	{ id: 3, name: '감-항아리', count: 5, description: '감-항아리', img: '감-항아리.png' },
	{ id: 4, name: '리-항아리', count: 5, description: '리-항아리', img: '리-항아리.png' },
	{ id: 5, name: '찬란한-건-항아리', count: 5, description: '찬란한-건-항아리', img: '찬란한-건-항아리.png' },
	{ id: 1, name: '건-항아리', count: 10, description: '건-항아리', img: '건-항아리.png' },
    { id: 2, name: '곤-항아리', count: 5, description: '곤-항아리', img: '곤-항아리.png' },
	{ id: 3, name: '감-항아리', count: 5, description: '감-항아리', img: '감-항아리.png' },
	{ id: 4, name: '리-항아리', count: 5, description: '리-항아리', img: '리-항아리.png' },
	{ id: 5, name: '찬란한-건-항아리', count: 5, description: '찬란한-건-항아리', img: '찬란한-건-항아리.png' },
	{ id: 1, name: '건-항아리', count: 10, description: '건-항아리', img: '건-항아리.png' },
    { id: 2, name: '곤-항아리', count: 5, description: '곤-항아리', img: '곤-항아리.png' },
	{ id: 3, name: '감-항아리', count: 5, description: '감-항아리', img: '감-항아리.png' },
	{ id: 4, name: '리-항아리', count: 5, description: '리-항아리', img: '리-항아리.png' },
	{ id: 5, name: '찬란한-건-항아리', count: 5, description: '찬란한-건-항아리', img: '찬란한-건-항아리.png' },
	{ id: 1, name: '건-항아리', count: 10, description: '건-항아리', img: '건-항아리.png' },
    { id: 2, name: '곤-항아리', count: 5, description: '곤-항아리', img: '곤-항아리.png' },
	{ id: 3, name: '감-항아리', count: 5, description: '감-항아리', img: '감-항아리.png' },
	{ id: 4, name: '리-항아리', count: 5, description: '리-항아리', img: '리-항아리.png' },
	{ id: 5, name: '찬란한-건-항아리', count: 5, description: '찬란한-건-항아리', img: '찬란한-건-항아리.png' },
    { id: 1, name: '건-항아리', count: 10, description: '건-항아리', img: '건-항아리.png' },
    { id: 2, name: '곤-항아리', count: 5, description: '곤-항아리', img: '곤-항아리.png' },
	{ id: 3, name: '감-항아리', count: 5, description: '감-항아리', img: '감-항아리.png' },
	{ id: 4, name: '리-항아리', count: 5, description: '리-항아리', img: '리-항아리.png' },
	{ id: 5, name: '찬란한-건-항아리', count: 5, description: '찬란한-건-항아리', img: '찬란한-건-항아리.png' },
	{ id: 1, name: '건-항아리', count: 10, description: '건-항아리', img: '건-항아리.png' },
    { id: 2, name: '곤-항아리', count: 5, description: '곤-항아리', img: '곤-항아리.png' },
	{ id: 3, name: '감-항아리', count: 5, description: '감-항아리', img: '감-항아리.png' },
	{ id: 4, name: '리-항아리', count: 5, description: '리-항아리', img: '리-항아리.png' },
	{ id: 5, name: '찬란한-건-항아리', count: 5, description: '찬란한-건-항아리', img: '찬란한-건-항아리.png' },
	{ id: 1, name: '건-항아리', count: 10, description: '건-항아리', img: '건-항아리.png' },
    { id: 2, name: '곤-항아리', count: 5, description: '곤-항아리', img: '곤-항아리.png' },
	{ id: 3, name: '감-항아리', count: 5, description: '감-항아리', img: '감-항아리.png' },
	{ id: 4, name: '리-항아리', count: 5, description: '리-항아리', img: '리-항아리.png' },
	{ id: 5, name: '찬란한-건-항아리', count: 5, description: '찬란한-건-항아리', img: '찬란한-건-항아리.png' },
	{ id: 1, name: '건-항아리', count: 10, description: '건-항아리', img: '건-항아리.png' },
    { id: 2, name: '곤-항아리', count: 5, description: '곤-항아리', img: '곤-항아리.png' },
	{ id: 3, name: '감-항아리', count: 5, description: '감-항아리', img: '감-항아리.png' },
	{ id: 4, name: '리-항아리', count: 5, description: '리-항아리', img: '리-항아리.png' },
	{ id: 5, name: '찬란한-건-항아리', count: 5, description: '찬란한-건-항아리', img: '찬란한-건-항아리.png' },
    // ...
];
const Inventory = () => {
    const [selectedItem, setSelectedItem] = useState(null);

    const handleItemClick = (item) => {
        setSelectedItem(item);
    };
    
    return (
        <div className="inventory">
            <div className="item-detail">
                {selectedItem && (
                    <>
                        <img src={`${process.env.PUBLIC_URL}/img/${selectedItem.img}`} alt={selectedItem.name} />
                        <h2>{selectedItem.name}</h2>
                        <p>{selectedItem.description}</p>
                    </>
                )}
            </div>
            <div className="item-list">
                {sampleItems.map((item) => (
                    <div key={item.id} className="item" onClick={() => handleItemClick(item)}>
                        <span>{item.id}</span>
                        <span>{item.name}</span>
                        <span>{item.count}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Inventory;
