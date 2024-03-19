import React from 'react'
import {BrowserRouter, Routes, Route} from "react-router-dom"

// Layout
import Header from '../layout/Header'
import Footer from '../layout/Footer'
import ScrollToTop from '../component/ScrollTop'
// Page
import Main from '../page/Main'
import DivisionDetail from '../page/DivisionDetail'
import ProductDetail from '../page/ProductDetail'
import SignUp from '../page/SignUp'
import Signin from '../page/Signin'
import Modify from '../page/Modify'
import Basket from '../page/Basket'
import Order from '../page/Order'
import WishList from '../page/WishList'

function Router() {
    return (
    <BrowserRouter>
        <Header />
        <ScrollToTop />
        <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/division">
                <Route path=":detail" element={<DivisionDetail />} />
            </Route>
            <Route path="/productDetail">
                <Route path=":menu_id" element={<ProductDetail />} />
            </Route>
            <Route path="/signup" element={<SignUp /> } />
            <Route path="/signin" element={<Signin />} />
            <Route path="/modify" element={<Modify />} />
            <Route path="/order" element={<Order />}>
                {/* <Route path=":params" element={<Order />} /> */}
            </Route> 
            <Route path="/basket" element={<Basket />} />
            <Route path="/wishlist" element={<WishList />} />
        </Routes>
        <Footer />
    </BrowserRouter>
    )
}

export default Router