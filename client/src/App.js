import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./pages/layout";
import Main from "./pages";
import Auth from "./pages/auth";
import NoPage from "./pages/ne_page";

export default function App() {
    return (
        <BrowserRouter>
            <Routes path="/" element={<Layout />}>
                <Route index element={<Main />} />
                <Route path="auth" element={<Auth />} />
                <Route path="*" element={<NoPage />} />
            </Routes>
        </BrowserRouter>
    );
}
