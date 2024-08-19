import React, { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

export default function Home() {
    const navigate = useNavigate();
    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const paramValue = query.get("user");

    useEffect(() => {
        if (paramValue) navigate(`/image-change/${paramValue}`);
    }, [navigate]);
    return (
        <>
            <button onClick={() => navigate("/image-change/2")}>
                페이지이동
            </button>
        </>
    );
}
