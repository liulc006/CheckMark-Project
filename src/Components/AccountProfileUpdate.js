import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Box, Typography, Divider, Button, TextField, Alert } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { updateUser } from "../store";

const AccountProfileUpdate = () => {
    const { id }= useParams();
    const { auth } = useSelector(state=>state);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [ input, setInput ] = useState({
        firstName: auth.firstName,
        lastName: auth.lastName,
        email: auth.email,
    });

    const [errorMessage, setErrorMessage] = useState(null);

    useEffect(()=>{
        setInput({
            firstName: auth.firstName,
            lastName: auth.lastName,
            email: auth.email, 
        })
    }, [auth]);

    const changeHandler = (ev) => {
        ev.preventDefault()
        setInput({...input, [ev.target.name]: ev.target.value});
    };

    //Submit the changes
    const submitEdit = () => {
        setErrorMessage(null);
        input.email = input.email.toLowerCase();
        dispatch(updateUser(input, navigate))
            .catch((err)=>{
                setErrorMessage('ERROR!');
            });
    };
    
    return (        
        <div style={{display:'flex', flexDirection:'column', alignItems:'center'}}>
            <Typography sx={{fontSize:'20', fontWeight:'bold', margin:'2rem'}}>Account Profile</Typography>
            <Box sx={{display:'flex', flexDirection:'column', border:'black 1px solid', borderRadius:'5%',padding:'2rem', width:'50%', backgroundColor:'aliceblue'}}>
                {errorMessage ? <Alert sx={{width:'auto'}} severity="error">{errorMessage}</Alert>:null}
                <Box sx={{display:'flex', flexDirection:'row', margin:'1rem'}}>
                    <Typography sx={{width:'50%', color:'gray'}}>First Name</Typography> 
                    <TextField 
                        placeholder="Enter Your First Name"
                        name="firstName"
                        value={input.firstName}
                        onChange={changeHandler}
                    />
                </Box>
                <Divider/>
                <Box sx={{display:'flex', flexDirection:'row', margin:'1rem'}}>
                    <Typography sx={{width:'50%', color:'gray'}}>Last Name</Typography> 
                    <TextField 
                        placeholder="Enter Your Last Name"
                        name="lastName"
                        value={input.lastName}
                        onChange={changeHandler}
                    />                
                </Box>
                <Divider/>
                <Box sx={{display:'flex', flexDirection:'row', margin:'1rem'}}>
                    <Typography sx={{width:'50%', color:'gray'}}>Email</Typography> 
                    <TextField 
                        placeholder="Enter Your Email"
                        name="email"
                        value={input.email}
                        onChange={changeHandler}
                    />                
                </Box>
                <Divider/>
                <Box sx={{display:'flex', flexDirection:'row', margin:'1rem'}}>
                    <Typography sx={{width:'50%', color:'gray'}}>Password</Typography> 
                    <Typography sx={{width:'50%'}}>********</Typography>
                </Box>
                <Divider/>
                <Button variant='outlined' sx={{marginTop:'1rem'}} onClick={submitEdit}>CONFIRM</Button>
                <Button variant='outlined' sx={{marginTop:'1rem'}} href={`/#/account/${id}`}>Back</Button>
            </Box>    
        </div>
    );
};

export default AccountProfileUpdate;