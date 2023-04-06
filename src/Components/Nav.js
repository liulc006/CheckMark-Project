import React from "react";
import { logout } from "../store";
import { Button } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";

const Nav = () => {
    const dispatch = useDispatch();
    const { auth } = useSelector(state => state);

    const loggingOut = (ev) => {
        dispatch(logout());
    };


    return (
        <div style={{display:'flex', flexDirection:'row', backgroundColor:'FAF9F6'}}>
            <img style={{height:'10vh'}} alt='Logo' src="../static/Nav-Logo.png"/>
            <h1>Nav Bar: Welcome to CheckMark</h1>
            {auth._id ?
            <Button variant='contained' onClick={loggingOut}>Logout</Button>
            : null}
        </div>
    )
}

export default Nav;