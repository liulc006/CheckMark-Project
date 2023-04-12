import React from "react";
import { Typography, Box, Card, 
    CardActions, CardContent, Button, 
    Chip, Stack, CardActionArea
} from "@mui/material";

const ChecklistDetail = (prop) => {
    const date = new Date(prop.checklistObj.updatedAt);
    

    return (
        <>
        <Box>
            <Card variant="outlined" sx={{
                borderWidth: '10px',
                borderColor: (prop.checklistObj.priorityLevel === "high") ? "red"
                :
                (prop.checklistObj.priorityLevel === "medium") ? "orange" : "gold",
                display: 'flex',
                flexDirection:'column',
            }}>
                <CardContent sx={{display:'flex', flexDirection:'column'}}>
                    <Typography sx={{ fontSize: 10 }}>
                        Updated On: {date.toLocaleString()}
                    </Typography>
                    <Typography sx={{ fontSize: 15, color:
                        prop.checklistObj.status==='open' ? 'red': 'green' }}>
                        Status: {prop.checklistObj.status}
                    </Typography>
                    <Typography sx={{ fontSize: 15}}>
                        Priority: 
                        <span style={{color: (prop.checklistObj.priorityLevel === "high") ? "red"
                        :
                        (prop.checklistObj.priorityLevel === "medium") ? "orange" : "gold"
                        }}>
                            {prop.checklistObj.priorityLevel}
                        </span>
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

export default ChecklistDetail;