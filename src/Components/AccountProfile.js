import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Box, Typography, Divider, Button } from "@mui/material";
import { useSelector } from "react-redux";

const AccountProfile = () => {
    const { id }= useParams();
    const { auth } = useSelector(state=>state);
    const navigate = useNavigate();

    //Show the view of the edit form
    const editProfile = () => {
         navigate(`/account/${id}/update`);
    };

    //change password form
    const changePassword = () => {
        navigate(`/account/${id}/update_password`);
    };

    return(
        <div style={{display:'flex', flexDirection:'column', alignItems:'center', height:'85vh'}}>
            <Typography sx={{fontSize:'20', fontWeight:'bold', margin:'2rem'}}>Account Profile</Typography>

            <Box sx={{display:'flex', flexDirection:'column', border:'black 1px solid', borderRadius:'5%',padding:'2rem', width:'50%', backgroundColor:'aliceblue'}}>
                <Box sx={{display:'flex', flexDirection:'row', margin:'1rem'}}>
                    <Typography sx={{width:'50%', color:'gray'}}>First Name</Typography> 
                    <Typography sx={{width:'50%'}}>{auth.firstName ? auth.firstName : '-'}</Typography>
                </Box>
                <Divider/>
                <Box sx={{display:'flex', flexDirection:'row', margin:'1rem'}}>
                    <Typography sx={{width:'50%', color:'gray'}}>Last Name</Typography> 
                    <Typography sx={{width:'50%'}}>{auth.lastName ? auth.lastName : '-'}</Typography>
                </Box>
                <Divider/>
                <Box sx={{display:'flex', flexDirection:'row', margin:'1rem'}}>
                    <Typography sx={{width:'50%', color:'gray'}}>Email</Typography> 
                    <Typography sx={{width:'50%'}}>{auth.email}</Typography>
                </Box>
                <Divider/>
                <Box sx={{display:'flex', flexDirection:'row', margin:'1rem'}}>
                    <Typography sx={{width:'50%', color:'gray'}}>Password</Typography> 
                    <Typography sx={{width:'50%'}}>********</Typography>
                </Box>
                <Divider/>
                <Button variant='outlined' sx={{marginTop:'1rem'}} onClick={editProfile}>EDIT</Button>
                <Button variant='outlined' sx={{marginTop:'1rem'}} onClick={changePassword}>CHANGE PASSWORD</Button>
            </Box>
        </div>
    )
};

export default AccountProfile;