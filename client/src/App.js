import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import cookieCutter from "cookie-cutter";
import Axios from "axios";

import Main from "./pages";
import Auth from "./pages/auth";
import NoPage from "./pages/ne_page";

export default function App() {
    const [isAuth, setIsAuth] = useState(false);

    const urlAPI = process.env.REACT_APP_URLAPI;

    useEffect(() => {
        if (cookieCutter.get("userToken")) {
            Axios.post(`${urlAPI}/check`, {
                token: cookieCutter.get("userToken"),
            }).then((res) => {
                if (res.data.auth) {
                    setIsAuth(true);
                } else {
                    setIsAuth(false);
                    cookieCutter.set("userToken", "0", {
                        expires: new Date(0),
                    });
                }
            });
        }
    });

    return (
        <BrowserRouter>
            <Routes path="/">
                <Route index element={isAuth ? <Main /> : <Auth />} />
                <Route path="*" element={<NoPage />} />
            </Routes>
        </BrowserRouter>
    );
}
