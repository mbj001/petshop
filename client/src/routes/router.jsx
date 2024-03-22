import React, {useState} from 'react'
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
import Mileage from '../page/Mileage'

function Router() {
    const [render, setRender] = useState(false);

    function handleRender(){
        setRender(!render);
    }

    return (
    <BrowserRouter>
        <Header render={render} />
        <ScrollToTop />
        <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/division">
                <Route path=":detail" element={<DivisionDetail />} />
            </Route>
            <Route path="/productDetail">
                <Route path=":menu_id" element={<ProductDetail handleRender={handleRender} />} />
            </Route>
            <Route path="/signup" element={<SignUp /> } />
            <Route path="/signin" element={<Signin />} />
            <Route path="/modify" element={<Modify />} />
            <Route path="/order" element={<Order handleRender={handleRender} />}>
                {/* <Route path=":params" element={<Order />} /> */}
            </Route> 
            <Route path="/basket" element={<Basket handleRender={handleRender} />} />
            <Route path="/wishlist" element={<WishList handleRender={handleRender} />} />
            <Route path="/mileage">
                <Route path=":mileage_params" element={<Mileage />} />
            </Route>
        </Routes>
        <Footer />
    </BrowserRouter>
    )
}

export default Router