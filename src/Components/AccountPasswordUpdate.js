import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Box, Typography, Divider, Button, TextField, Alert } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { updatePassword } from "../store";

const AccountPasswordUpdate = () => {
    const { id }= useParams();
    const { auth } = useSelector(state=>state);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [ oldPassword, setOldPassword ] = useState('');
    const [ newPassword, setNewPassword ] = useState('');
    const [ checkPassword, setCheckPassword ] = useState('');


    const [errorMessage, setErrorMessage] = useState(null);

    //Submit the changes
    const submitEdit = () => {
        setErrorMessage(null);
        if(oldPassword.length===0 || newPassword.length===0){
            setErrorMessage("Empty Field")
        }
        else if(newPassword !== checkPassword){
            setErrorMessage("Password DOES NOT match!");
        }
        else{
            dispatch(updatePassword(oldPassword,newPassword, navigate))
                .catch((err)=>{
                    if(err.response.status === 401){
                        setErrorMessage('Old Password is Wrong!');
                    }
                    else{
                        setErrorMessage('Error!')
                    }
                });
        }
    };
    
    return (        
        <div style={{display:'flex', flexDirection:'column', alignItems:'center'}}>
            <Typography sx={{fontSize:'20', fontWeight:'bold', margin:'2rem'}}>Account Profile</Typography>
            <Box sx={{display:'flex', flexDirection:'column', border:'black 1px solid', borderRadius:'5%',padding:'2rem', width:'50%', backgroundColor:'aliceblue'}}>
                {errorMessage ? <Alert sx={{width:'auto'}} severity="error">{errorMessage}</Alert>:null}
                <Box sx={{display:'flex', flexDirection:'row', margin:'1rem'}}>
                    <Typography sx={{width:'50%', color:'gray'}}>Old Password</Typography> 
                    <TextField 
                        placeholder="Enter Old Password"
                        name="password"
                        value={oldPassword}
                        onChange={(ev)=>setOldPassword(ev.target.value)}
                    />   
                </Box>
                <Divider/>
                <Box sx={{display:'flex', flexDirection:'row', margin:'1rem'}}>
                    <Typography sx={{width:'50%', color:'gray'}}>New Password</Typography> 
                    <TextField 
                        placeholder="Enter New Password"
                        name="password"
                        value={newPassword}
                        onChange={(ev)=>setNewPassword(ev.target.value)}
                    />   
                </Box>
                <Box sx={{display:'flex', flexDirection:'row', margin:'1rem'}}>
                    <Typography sx={{width:'50%', color:'gray'}}>Re-Enter New Password</Typography> 
                    <TextField 
                        placeholder="Enter New Password"
                        name="password"
                        value={checkPassword}
                        onChange={(ev)=>setCheckPassword(ev.target.value)}
                    />   
                </Box>
                <Divider/>
                <Button variant='outlined' sx={{marginTop:'1rem'}} onClick={submitEdit}>CONFIRM</Button>
                <Button variant='outlined' sx={{marginTop:'1rem'}} href={`/#/account/${id}`}>Back</Button>
            </Box>    
        </div>
    );
};

export default AccountPasswordUpdate;