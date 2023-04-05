import React from "react";
import { Typography, Box, Card, CardActions, CardContent, Button, Chip } from "@mui/material";

const ChecklistCard = (prop) => {
    return (
        <>
        <h1>card {prop.checklistObj._id}</h1>
        <Box sx={{ minWidth: 275 , maxWidth: 600}}>
            <Card variant="outlined" sx={{
                borderWidth: '10px',
                borderColor: (prop.checklistObj.priorityLevel === "high") ? "red"
                :
                (prop.checklistObj.priorityLevel === "medium") ? "orange" : "green"
            }}>
                <CardContent>
                    <Typography sx={{ fontSize: 20 }}>
                        {prop.checklistObj.description}
                    </Typography>
                    {prop.checklistObj.tags.map(ele => {
                        return <Chip key={ele} variant="outlined" label={ele}/>
                    })}
                </CardContent>
                {/* <CardActions>
                    <Button variant="outlined">Completed?</Button>
                </CardActions> */}
            </Card>
        </Box>
        </>
    );
};

export default ChecklistCard;