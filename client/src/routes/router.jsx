import React from 'react'
import {BrowserRouter, Routes, Route} from "react-router-dom"

// Layout
import Header from '../layout/Header'
import Footer from '../layout/Footer'
// Page
import Main from '../page/Main'
import DivisionDetail from '../page/DivisionDetail'
import ProductDetail from '../page/ProductDetail'
import SignUp from '../page/SignUp'
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
            <Route path="/signup" element={<SignUp /> } />
        </Routes>
        <Footer />
    </BrowserRouter>
    )
}

export default Router