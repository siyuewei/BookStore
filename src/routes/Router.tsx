import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import React from "react";
import HomeView from "../View/HomeView";
import { BooksView } from "../View/BooksView";
import { CartView } from "../View/CartView";
import { OrderView } from "../View/OrderView";
import { ProfileView } from "../View/ProfileView";
import { BooksDetailView } from "../View/BooksDetailView";
import { LoginView } from "../View/LoginView";
import { RegisterView } from "../View/RegisterView";
import { CartCheckOutView } from "../View/CartCheckOutView";
import { UsersView } from "../View/UsersView";
import { StatisticsAdminChartsView } from "../View/StatisticsAdminChartsView";
import { TestView } from "../View/TestView";
import { AddBookView } from "../View/AddBookView";
import { Cookies } from "react-cookie";
import { IRole, IUser } from "../interface";
import { StatisticsCustomerView } from "../View/StatisticsCustomerView";
import { StatisticsAdminTableOldView } from "../View/StatisticsAdminTableOldView";
import { StatisticsAdminTableView } from "../View/StatisticsAdminTableView";

export const Router = () => {
  const cookies = new Cookies();
  const user: IUser = cookies.get("currentUser");

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/home" element={<HomeView />}>
          <Route path="books" element={<BooksView />} />
          <Route path={"books/:id"} element={<BooksDetailView />} />
          <Route path="cart" element={<CartView />} />
          <Route path="order" element={<OrderView />} />
          <Route path="profile" element={<ProfileView />} />
          <Route path="checkOut" element={<CartCheckOutView />}></Route>

          <Route path="users" element={<UsersView />}></Route>
          <Route
            path="statistics_customer"
            element={<StatisticsCustomerView />}
          ></Route>
          <Route
            path="statistics_admin"
            element={<StatisticsAdminTableView />}
          ></Route>
          {/*<Route*/}
          {/*  path="statistics"*/}
          {/*  element={*/}
          {/*    user.role === IRole.ADMIN ? (*/}
          {/*      <StatisticsAdminChartsView />*/}
          {/*    ) : (*/}
          {/*      <StatisticsCustomerView />*/}
          {/*    )*/}
          {/*  }*/}
          {/*></Route>*/}
          <Route path="addBook" element={<AddBookView />}></Route>

          <Route path="/home" element={<Navigate to="/home/books" />}></Route>
        </Route>
        <Route path="/login" element={<LoginView />}></Route>
        <Route path="/register" element={<RegisterView />}></Route>

        <Route path={"/test"} element={<TestView />}></Route>

        {/*<Route path={"/books/:id"} element={<BooksDetailView />} />*/}
      </Routes>
    </BrowserRouter>
  );
};
