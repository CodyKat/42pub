//import React, { useState, useEffect } from 'react';
//import ProductCard from './ProductCard';

//const ProductList = () => {
//  const [products, setProducts] = useState([]);

//  useEffect(() => {
//    async function fetchData() {
//      const response = await fetch('http://127.0.0.1:5000/api/items');
//      const json = await response.json();
//      setProducts(json);
//    }
//    fetchData();
//  }, []);

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
            <ProductCard key={index} item={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductList;
