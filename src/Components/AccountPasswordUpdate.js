import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Box, Typography, Divider, Button, TextField, Alert,InputAdornment, IconButton, InputLabel, OutlinedInput, FormControl } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { updatePassword } from "../store";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const AccountPasswordUpdate = () => {
    const { id }= useParams();
    const { auth } = useSelector(state=>state);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [ oldPassword, setOldPassword ] = useState('');
    const [ viewOldPassword, setViewOldPassword ] = useState(false);

    const [ newPassword, setNewPassword ] = useState('');
    const [ viewNewPassword, setViewNewPassword ] = useState(false);

    const [ checkPassword, setCheckPassword ] = useState('');
    const [ viewCheckPassword, setViewCheckPassword ] = useState(false);

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

    const handleClickShowOldPassword = () => setViewOldPassword((viewOldPassword) => !viewOldPassword);
    const handleClickShowNewPassword = () => setViewNewPassword((viewNewPassword) => !viewNewPassword);
    const handleClickShowCheckPassword = () => setViewCheckPassword((viewNewPassword) => !viewNewPassword);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    
    return (        
        <div style={{display:'flex', flexDirection:'column', alignItems:'center'}}>
            <Typography sx={{fontSize:'20', fontWeight:'bold', margin:'2rem'}}>Account Profile</Typography>
            <Box sx={{display:'flex', flexDirection:'column', border:'black 1px solid', borderRadius:'5%',padding:'2rem', width:'50%', backgroundColor:'aliceblue'}}>
                {errorMessage ? <Alert sx={{width:'auto'}} severity="error">{errorMessage}</Alert>:null}
                <Box sx={{display:'flex', flexDirection:'row', margin:'1rem'}}>
                    <Typography sx={{width:'50%', color:'gray'}}>Old Password</Typography> 
                    <FormControl sx={{margin:'5px', width: '20rem'}} 
                        variant="outlined"
                        value = {oldPassword}
                        onChange={ (ev)=>setOldPassword(ev.target.value) }
                    >
                        <InputLabel htmlFor="password">Old Password</InputLabel>
                        <OutlinedInput
                            id="password"
                            type={viewOldPassword ? 'text' : 'password'}
                            name='password'
                            endAdornment={
                                <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowOldPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                >
                                    {viewOldPassword ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                                </InputAdornment>
                            }
                            label="Old Password"
                            variant='outlined'
                        />
                    </FormControl> 
                </Box>
                <Divider/>               
            
                <Box sx={{display:'flex', flexDirection:'row', margin:'1rem'}}>
                    <Typography sx={{width:'50%', color:'gray'}}>New Password</Typography> 
                    <FormControl sx={{margin:'5px', width: '20rem'}} 
                        variant="outlined"
                        value = {newPassword}
                        onChange={ (ev)=>setNewPassword(ev.target.value) }
                    >
                        <InputLabel htmlFor="password">New Password</InputLabel>
                        <OutlinedInput
                            id="new password"
                            type={viewNewPassword ? 'text' : 'password'}
                            name='new password'
                            endAdornment={
                                <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowNewPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                >
                                    {viewNewPassword ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                                </InputAdornment>
                            }
                            label="New Password"
                            variant='outlined'
                        />
                    </FormControl>  
                </Box>
                <Box sx={{display:'flex', flexDirection:'row', margin:'1rem'}}>
                    <Typography sx={{width:'50%', color:'gray'}}>Re-Enter New Password</Typography> 
                    <FormControl sx={{margin:'5px', width: '20rem'}} 
                        variant="outlined"
                        value = {checkPassword}
                        onChange={ (ev)=>setCheckPassword(ev.target.value) }
                    >
                        <InputLabel htmlFor="password">New Password</InputLabel>
                        <OutlinedInput
                            id="check password"
                            type={viewCheckPassword ? 'text' : 'password'}
                            name='check password'
                            endAdornment={
                                <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowCheckPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                >
                                    {viewCheckPassword ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                                </InputAdornment>
                            }
                            label="New Password"
                            variant='outlined'
                        />
                    </FormControl> 
                </Box>
                <Divider/>
                <Button variant='outlined' sx={{marginTop:'1rem'}} onClick={submitEdit}>CONFIRM</Button>
                <Button variant='outlined' sx={{marginTop:'1rem'}} href={`/#/account/${id}`}>Back</Button>
            </Box>    
        </div>
    );
};

export default AccountPasswordUpdate;