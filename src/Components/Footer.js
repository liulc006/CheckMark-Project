import { Box, Link } from "@mui/material";
import React from "react";

const Footer = () => {
    return (
        <Box sx={{display:'flex', flexDirection:'row',height:'4rem', backgroundColor:'skyblue', alignItem:'center',justifyContent:'center'}}>
            <Link underline="none" href='https://www.linkedin.com/in/luca-liu-3377a5162/' sx={{color:'white', padding:'1rem'}}>LinkedIn</Link>
            <Link underline="none" href='https://github.com/liulc006' sx={{color:'white', padding:'1rem'}}>GitHub</Link>

        </Box>
    );
};

export default Footer;