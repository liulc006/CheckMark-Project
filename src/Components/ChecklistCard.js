import React, { useState } from "react";
import { Typography, Box, Card, 
    FormControlLabel, CardContent, Checkbox, 
    Chip, Stack,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { updateChecklist } from "../store/checklist";

const ChecklistCard = (prop) => {
    const date = new Date(prop.checklistObj.updatedAt);
    const [status, setStatus] = useState(prop.checklistObj.status==='open'?false:true);
    const dispatch = useDispatch();

    const statusChange = (ev) => {
        ev.stopPropagation();
        setStatus(ev.target.checked);
        dispatch(updateChecklist({_id: prop.checklistObj._id, 
            status: ev.target.checked?'close':'open'}));
    };

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
                <Box sx={{display:'flex', flexDirection:'row',justifyContent:'center'}}>
                    <FormControlLabel
                        control={<Checkbox 
                            onClick={statusChange}
                            checked={status}
                        />}
                        label="Completed?"
                        labelPlacement="start"
                    />
                </Box>
            </Card>
        </Box>
        </>
    );
};

export default ChecklistCard;