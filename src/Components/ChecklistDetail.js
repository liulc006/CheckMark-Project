import React, {useState} from "react";
import { Typography, Box, Card, 
    CardActions, CardContent, Button, 
    Chip, Stack, CardActionArea
} from "@mui/material";
import { useDispatch } from "react-redux";
import { deleteChecklist } from "../store/checklist";

const ChecklistDetail = (prop) => {
    const date = new Date(prop.checklistObj.updatedAt);
    const [viewUpdate, setViewUpdate] = useState(false);

    const dispatch = useDispatch();
    
    //button function to delete checklist
    const deleteButton = (ev) => {
        ev.preventDefault();
        dispatch(deleteChecklist(prop.checklistObj));
        prop.setView({view: false, checklistObj: null})
    };

    //set viewupdate to true and display UpdateForm component to update checklist
    const updateButton = (ev) => {
        ev.preventDefault();
        setViewUpdate(true);
    };

    return (
        <>
        {!viewUpdate ? <Box>
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
                <Box sx={{display:'flex', flexDirection:'row',justifyContent:'space-around'}}>
                    <Button variant="outlined" sx={{width:'min-content'}} onClick={deleteButton} >Delete</Button>
                    <Button variant="outlined" sx={{width:'min-content'}} onClick={updateButton}>Edit</Button>
                </Box>
                <Box sx={{display:'flex', flexDirection:'row',justifyContent:'center'}}>
                    <Button variant="outlined" sx={{width:'min-content'}}>Completed</Button>
                </Box>
            </Card>
        </Box>
        :
        <h1>View Update Form</h1>
        }
        </>
    );
};

export default ChecklistDetail;