import React from "react";
import { logout } from "../store";
import { Button, Box, IconButton } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import { Link, useNavigate } from "react-router-dom";

const Nav = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { auth } = useSelector(state => state);

    const loggingOut = (ev) => {
        dispatch(logout(navigate));
    };


    return (
        <div style={{display:'flex', flexDirection:'row', backgroundColor:'FAF9F6', justifyContent:'space-between'}}>
            <Box>
                <img style={{height:'10vh'}} alt='Logo' src="../static/Nav-Logo.png"/>
            </Box>
            <Box sx={{display:'flex', justifyContent:'center', alignItems:'center' ,marginRight:'1rem'}}>
                {auth._id ?
                <Box>
                    <IconButton sx={{marginRight:'1rem'}}>
                        <Link to={`/account/${auth._id}`} style={{color:'inherit'}}>
                            <AccountBoxIcon />
                        </Link>
                    </IconButton>
                    <Button variant='contained' onClick={loggingOut} sx={{height:'min-content'}}>Logout</Button>
                </Box>
                : null}
            </Box>
        </div>
    )
}

export default Nav;