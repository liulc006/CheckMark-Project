import { Box, Link } from "@mui/material";
import { makeStyles } from '@mui/styles';
import React from "react";

const useStyles = makeStyles(theme=> ({
    link:{
        underline: 'none',
        padding:'1rem',
    }
}));

const Footer = () => {
    const classes = useStyles();

    return (
        <Box sx={{display:'flex', flexDirection:'row',height:'4rem', backgroundColor:'skyblue', alignItem:'center',justifyContent:'center'}}>
            <Link underline="none" className={classes.link} href='https://www.linkedin.com/in/luca-liu-3377a5162/' sx={{color:'white'}}>LinkedIn</Link>
            <Link underline="none" className={classes.link} href='https://github.com/liulc006' sx={{color:'white'}}>GitHub</Link>

        </Box>
    );
};

export default Footer;