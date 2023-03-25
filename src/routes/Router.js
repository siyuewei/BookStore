import {BrowserRouter, Route, Routes, Outlet, Navigate} from "react-router-dom";
import React from "react";
import HomeView from "../View/HomeView";
import {BooksView} from "../View/BooksView";
import {CartView} from "../View/CartView";
import {OrderView} from "../View/OrderView";
import {ProfileView} from "../View/ProfileView";
import {BooksDetailView} from "../View/BooksDetailView";
// import {Excel} from "../View/ExcelView";
export const Router = () => {
    return <BrowserRouter>
        <Routes>
            <Route path="/" element={<HomeView />}>
                <Route path="books" element={<BooksView/>}/>
                <Route path={"books/:id"} element={<BooksDetailView />}/>
                <Route path="cart" element={<CartView />} />
                <Route path="order" element={<OrderView/>}/>
                <Route path="profile" element={<ProfileView/>}/>
                <Route path="/" element={<Navigate to="books" />} />
            </Route>
            {/*<Route path={"/books/:id"} element={<BooksDetailView />} />*/}
        </Routes>
    </BrowserRouter>
}