import React from 'react';

const ProductCard = ({ item }) => {
  const { id, name, description, typeInfo, subCategory, isCash, icon } = item;

  return (
    <div className="col mb-5">
      <div className="card h-100">
        <img className="card-img-top" src={icon} alt={name} />
        <div className="card-body p-4">
          <div className="text-center">
            <h5 className="fw-bolder">{name}</h5>
            <p>{description}</p>
            <p>{typeInfo.category} - {subCategory}</p>
            <p>{isCash ? 'Cash Item' : 'Non-Cash Item'}</p>
          </div>
        </div>
        <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
          <div className="text-center">
            <button className="btn btn-outline-dark mt-auto">Buy</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
