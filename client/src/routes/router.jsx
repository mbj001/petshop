import React from 'react'
import {BrowserRouter, Routes, Route} from "react-router-dom"

import Header from '../layout/Header'
import Main from '../page/Main'
import ProductDetail from '../page/ProductDetail'

function Router() {
    return (
    <BrowserRouter>
        <Header />
        <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/product">
                <Route path=":detail" element={<ProductDetail />} />
            </Route>
        </Routes>
    </BrowserRouter>
    )
}

export default Router