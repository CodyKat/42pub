import React from 'react';
import { Link } from 'react-router-dom';

const ItemShop2 = () => {
    return (
        <section className="py-5">
            <div className="container px-4 px-lg-5 mt-5">
                <div className="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
                    {/* Add each product card inside this loop */}
                    {['건', '곤', '감', '리'].map((name, index) => (
                        <div className="col mb-5" key={index}>
                            <div className="card h-100">
                                {/* Product image */}
                                <img
                                    className="card-img-top"
                                    src={`./img/${name}-항아리.png`}
                                    alt={`${name} 항아리`}
                                />
                                {/* Product details */}
                                <div className="card-body p-4">
                                    <div className="text-center">
                                        {/* Product name */}
                                        <h5 className="fw-bolder">{`${name} 항아리`}</h5>
                                        {/* Product price */}
                                        10 point
                                    </div>
                                </div>
                                {/* Product actions */}
                                <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
									<div className="text-center">
										<Link
											to={`/roulette/${name}`}
											className="btn btn-outline-dark mt-auto"
										>
											항아리 뽑기
										</Link>
									</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="container px-4 px-lg-5 mt-5">
                <div className="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
                    {/* Add each product card inside this loop */}
                    {['찬란한-건', '찬란한-곤', '찬란한-감', '찬란한-리'].map((name, index) => (
                        <div className="col mb-5" key={index}>
                            <div className="card h-100">
                                {/* Product image */}
                                <img
                                    className="card-img-top"
                                    src={`./img/${name}-항아리.png`}
                                    alt={`${name} 항아리`}
                                />
                                {/* Product details */}
                                <div className="card-body p-4">
                                    <div className="text-center">
                                        {/* Product name */}
                                        <h5 className="fw-bolder">{`${name} 항아리`}</h5>
                                        {/* Product price */}
                                        1000 point
                                    </div>
                                </div>
                                {/* Product actions */}
                                <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
									<div className="text-center">
										<Link
											to={`/roulette/${name}`}
											className="btn btn-outline-dark mt-auto"
										>
											항아리 뽑기
										</Link>
									</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ItemShop2;
