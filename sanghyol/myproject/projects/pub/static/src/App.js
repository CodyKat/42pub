import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navigation from './Navigation';
import Header from './Header';
import ImageContent2 from './itemshop2';
import Inventory from './Inventory';
import Roulette from './Roulette';
import ProductList from './ProductList';
//import BackgroundAnimation from './BackgroundAnimation';


const App = () => {
    return (
        <Router>
            <div>
                <Routes>
                    {/*<Route path="/" element={
                        <>
                            <BackgroundAnimation />
                        </>
                    } />*/}
                    <Route path="/itemshop1" element={
                        <>
                            <Navigation />
                            <Header
                                title="아이탬 상점"
                                subtitle="가격은 ekwak 마음대로"
                            />
                            <ProductList />
                        </>
                    } />
                    <Route path="/itemshop2" element={
                        <>
                            <Navigation />
                            <Header
                                title="항아리 상점"
                                subtitle="항아리 상점에 대한 설명"
                            />
                            <ImageContent2 />
                        </>
                    } />
                    <Route path="/roulette/:jarName" element={<Roulette />} />
                    <Route path="/inventory" element={
                        <>
                            <Navigation />
                            <Inventory />
                        </>
                    } />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
