import React from "react";
import { Typography, Box, Card, 
    CardActions, CardContent, Button, 
    Chip, Stack
} from "@mui/material";

const ChecklistCard = (prop) => {
    const date = new Date(prop.checklistObj.updatedAt);

    return (
        <>
        <Box>
            <Card variant="outlined" sx={{
                borderWidth: '10px',
                borderColor: (prop.checklistObj.priorityLevel === "high") ? "red"
                :
                (prop.checklistObj.priorityLevel === "medium") ? "orange" : "blanchedAlmond",
                display: 'flex',
                flexDirection:'column',
            }}>
                <CardContent sx={{display:'flex', flexDirection:'column'}}>
                    <Typography sx={{ fontSize: 10 }}>
                        {date.toLocaleString()}
                    </Typography>
                    <Typography sx={{ fontSize: 20 }}>
                        {prop.checklistObj.description}
                    </Typography>
                    <Stack direction='row' spacing='1' sx={{justifyContent:'right'}}>
                        {prop.checklistObj.tags.map(ele => {
                            return <Chip key={ele} variant="outlined" label={ele}/>
                        })}
                    </Stack>
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