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
        <>
            <Box sx={{display:{xs:'none', md:'flex'}, flexDirection:'row', backgroundColor:'skyblue', justifyContent:'space-between'}}>
                <Box>
                    <Link to='/'>
                        <img style={{height:'10vh'}} alt='Logo' src="../static/Nav-Logo.png"/>
                    </Link>
                </Box>
                <Box sx={{display:'flex', justifyContent:'center', alignItems:'center',marginRight:'1rem', width:'50%'}}>
                    {auth._id ?
                    <Box sx={{display:'flex', flexDirection:'row', alignItems:'center',justifyContent:'space-evenly', width:'100%'}}>
                        <Box>
                            <Link style={{textDecoration:'none', color:'white', fontWeight:'bold'}} to='/'>HOME</Link>
                        </Box>
                        <Box>
                            <Link style={{textDecoration:'none', color:'white', fontWeight:'bold'}} to='/checklist'>CHECKLIST</Link>
                        </Box>
                        {/* <Box>
                            <Link style={{textDecoration:'none', color:'white', fontWeight:'bold'}} to='/project-management'>PROJECT MANAGEMENT</Link>
                        </Box> */}
                        <Box>
                            <IconButton>
                                <Link to={`/account/${auth._id}`} style={{color:'white'}}>
                                    <AccountBoxIcon />
                                </Link>
                            </IconButton>
                        </Box>
                        <Box>
                            <Button variant='contained' onClick={loggingOut} sx={{height:'min-content'}}>Logout</Button>
                        </Box>
                    </Box>
                    : null}
                </Box>
            </Box>

            <Box sx={{display:{xs:'flex', md:'none'}, flexDirection:'column', backgroundColor:'skyblue'}}>
                <Box>
                    <img style={{width:'100vw',height:'10vh'}} alt='Logo' src="../static/Nav-Logo.png"/>
                </Box>
                <Box sx={{width:'100vw', display:'flex', flexDirection:'row', alignItems:'center', justifyContent:'space-around'}}>
                    <Box>
                        <Link style={{textDecoration:'none', color:'white'}} to='/'>HOME</Link>
                    </Box>
                    <Box>
                        <Link style={{textDecoration:'none', color:'white'}} to='/checklist'>CHECKLIST</Link>
                    </Box>
                    {/* <Box>
                        <Link style={{textDecoration:'none', color:'white'}} to='/project-management'>PROJECT MANAGEMENT</Link>
                    </Box> */}
                    <Box>
                        <IconButton>
                            <Link to={`/account/${auth._id}`} style={{color:'white'}}>
                                <AccountBoxIcon />
                            </Link>
                        </IconButton>
                    </Box>
                    <Box>
                        <Button variant='contained' onClick={loggingOut} sx={{height:'min-content'}}>Logout</Button>
                    </Box>
                </Box>
            </Box>
        </>
    )
}

export default Nav;