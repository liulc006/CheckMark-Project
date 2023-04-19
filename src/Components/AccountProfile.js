import React from "react";
import { useParams } from "react-router-dom";
import { Box, Typography, Divider} from "@mui/material";
import { useSelector } from "react-redux";

const AccountProfile = () => {
    const { id }= useParams();
    const { auth } = useSelector(state=>state)

    return(
        <div style={{display:'flex', flexDirection:'column', alignItems:'center'}}>
            <Typography>Account Profile</Typography>
            <Box sx={{display:'flex', flexDirection:'column', border:'black 1px solid', borderRadius:'5%',padding:'2rem', width:' 40%', backgroundColor:'aliceblue'}}>
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
            </Box>
        </div>
    )
};

export default AccountProfile;