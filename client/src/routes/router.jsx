import React from 'react'
import {BrowserRouter, Routes, Route} from "react-router-dom"

import Header from '../layout/Header'
import Main from '../page/Main'
import DivisionDetail from '../page/DivisionDetail'
import ProductDetail from '../page/ProductDetail'
function Router() {
    return (
    <BrowserRouter>
        <Header />
        <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/division">
                <Route path=":detail" element={<DivisionDetail />} />
            </Route>
            <Route path="/productDetail">
                <Route path=":menu_id" element={<ProductDetail />} />
            </Route>
        </Routes>
    </BrowserRouter>
    )
}

export default Router