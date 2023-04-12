import React from "react";
import { logout } from "../store";
import { Button, Box } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";

const Nav = () => {
    const dispatch = useDispatch();
    const { auth } = useSelector(state => state);

    const loggingOut = (ev) => {
        dispatch(logout());
    };


    return (
        <div style={{display:'flex', flexDirection:'row', backgroundColor:'FAF9F6', justifyContent:'space-between'}}>
            <Box>
                <img style={{height:'10vh'}} alt='Logo' src="../static/Nav-Logo.png"/>
            </Box>
            <Box sx={{display:'flex', justifyContent:'center', alignItems:'center' ,marginRight:'1rem'}}>
                {auth._id ?
                <Button variant='contained' onClick={loggingOut} sx={{height:'min-content'}}>Logout</Button>
                : null}
            </Box>
        </div>
    )
}

export default Nav;