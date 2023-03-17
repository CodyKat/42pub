import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navigation from './Navigation';
import Mainpage from './mainpage';
import Header from './Header';
import ImageContent2 from './itemshop2';
import Inventory from './Inventory';
import Roulette from './Roulette';
import ProductList from './ProductList';

const App = () => {
    return (
        <Router>
            <div>
                <Navigation />
                <Routes>
                    <Route path="/home" element={
                        <>
                            <Header
                                title="메인페이지"
                                subtitle="아무것도 없지롱"
                            />
                            <Mainpage />
                        </>
                    } />
                    <Route path="/itemshop1" element={
                        <>
                            <Header
                                title="아이탬 상점"
                                subtitle="가격은 ekwak 마음대로"
                            />
                            <ProductList />
                        </>
                    } />
                    <Route path="/itemshop2" element={
                        <>
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
                            <Inventory />
                        </>
                    } />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
