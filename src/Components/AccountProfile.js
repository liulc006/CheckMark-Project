import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Typography, Divider, Button, TextField } from "@mui/material";
import { useSelector } from "react-redux";

const AccountProfile = () => {
    const { id }= useParams();
    const { auth } = useSelector(state=>state);
    const [ viewForm, setViewForm ] = useState(false);

    const [ input, setInput ] = useState({
        firstName: auth.firstName,
        lastName: auth.lastName,
        email: auth.email,
    });

    useEffect(()=>{
        setInput({
            firstName: auth.firstName,
            lastName: auth.lastName,
            email: auth.email, 
        })
    }, [auth]);

    //Show the view of the edit form
    const editProfile = () => {
         setViewForm(true);
    };

    const changeHandler = (ev) => {
        ev.preventDefault()
        setInput({...input, [ev.target.name]: ev.target.value});
    };

    //Submit the changes
    const submitEdit = () => {
        console.log(input);
    };

    return(
        <div style={{display:'flex', flexDirection:'column', alignItems:'center'}}>
            <Typography sx={{fontSize:'20', fontWeight:'bold', margin:'2rem'}}>Account Profile</Typography>

            {viewForm ? 
            <Box sx={{display:'flex', flexDirection:'column', border:'black 1px solid', borderRadius:'5%',padding:'2rem', width:'50%', backgroundColor:'aliceblue'}}>
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
            </Box>    
            :
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
            </Box>
            }
        </div>
    )
};

export default AccountProfile;