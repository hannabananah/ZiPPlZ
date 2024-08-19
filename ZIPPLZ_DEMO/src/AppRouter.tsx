import React from "react";
import { Route, Routes } from "react-router-dom";
import App from "./App";
import Home from "./Home";

type Props = {};

export default function AppRouter({}: Props) {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/image-change/:userSerial" element={<App />} />
        </Routes>
    );
}
