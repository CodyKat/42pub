//import React from 'react';
//import ProductCard from './ProductCard';

//const ProductList = () => {
//  const products = [
//    {
//      imgSrc: `${process.env.PUBLIC_URL}/img/교복신발.png`,
//      productName: '교복신발',
//      price: '$40.00 - $80.00',
//    },
//    {
//      imgSrc: `${process.env.PUBLIC_URL}/img/루시드드림.png`,
//      productName: '루시드드림',
//      price: '$25.00',
//    },
//	{
//		imgSrc: `${process.env.PUBLIC_URL}/img/루시드실크헷.png`,
//		productName: '루시드실크헷',
//		price: '$25.00',
//	  },
//	  {
//		imgSrc: `${process.env.PUBLIC_URL}/img/분필.png`,
//		productName: '분필',
//		price: '$25.00',
//	  },
//	  {
//		imgSrc: `${process.env.PUBLIC_URL}/img/교복모자.png`,
//		productName: '교복모자',
//		price: '$25.00',
//	  },
//	  {
//		imgSrc: `${process.env.PUBLIC_URL}/img/교복상의.png`,
//		productName: '교복상의',
//		price: '$25.00',
//	  },
//	  {
//		imgSrc: `${process.env.PUBLIC_URL}/img/교복신발.png`,
//		productName: '교복신발',
//		price: '$25.00',
//	  },
//    // ...여기에 다른 상품들을 추가하세요
//  ];

//  return (
//    <section className="py-5">
//      <div className="container px-4 px-lg-5 mt-5">
//        <div className="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
//          {products.map((product, index) => (
//            <ProductCard key={index} {...product} />
//          ))}
//        </div>
//      </div>
//    </section>
//  );
//};

//export default ProductList;
import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('http://127.0.0.1:5000/api/items');
      const json = await response.json();
      setProducts(json);
    }
    fetchData();
  }, []);

  return (
    <section className="py-5">
      <div className="container px-4 px-lg-5 mt-5">
        <div className="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
          {products.map((product, index) => (
            <ProductCard key={index} {...product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductList;
