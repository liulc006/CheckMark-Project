import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Login from "./Login";
import { logout } from "../store";
import { Button } from "@mui/material";

const Home = () => {
    const dispatch = useDispatch();
    const { auth } = useSelector(state => state);

    const loggingOut = (ev) => {
        dispatch(logout());
    };

    return (
        <>
            {auth._id ? 
            <>
                <h1>Welcome In {auth.firstName || auth.email}!</h1> 
                <Button variant='contained' onClick={loggingOut}>Logout</Button>
            </>
            :
            <Login/>
            }
        </>
    )
};

export default Home;