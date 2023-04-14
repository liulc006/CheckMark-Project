import React, { useState }  from "react";
import { Box, Typography, TextField, MenuItem, Button } from "@mui/material";
import { MuiChipsInput } from 'mui-chips-input';
import { useDispatch } from "react-redux";
import { updateChecklist } from "../store/checklist";

const ChecklistUpdate = (prop) => {
    const dispatch = useDispatch();
    const date = new Date(prop.checklistObj.updatedAt);

    const [input, setInput] = useState({
        description: prop.checklistObj.description,
        priorityLevel: prop.checklistObj.priorityLevel,
    });
    const [tags, setTags] = useState(prop.checklistObj.tags)

    const priorityLevelInput = [
        {value: 'high', label: 'High'},
        {value: 'medium', label: 'Medium'},
        {value: 'low', label: 'Low'},
    ];

    const submitHandler = (ev) => {
        ev.preventDefault();
        const submission = {...input, tags: tags, _id: prop.checklistObj._id};
        dispatch(updateChecklist(submission));
        prop.setView({view: false, checklistObj: null});
    };

    const changeHandler = (ev) => {
        setInput({...input, [ev.target.name]:ev.target.value});
    };

    const changeChip = (value) => {
        setTags(value);
    }
    return (
        <Box 
            component='form'
            onSubmit={submitHandler}
            sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '400',
                bgcolor: 'background.paper',
                border: '2px solid #000',
                boxShadow: 24,
                display: 'flex',
                flexDirection: 'column',
                '& > :not(style)': { m: 1, width: '25ch' },
            }}
        >
            <Typography>Update Checklist</Typography>
            <Typography sx={{ fontSize: 10 }}>
                        Updated On: {date.toLocaleString()}
            </Typography>
            <TextField 
                label="Description"
                variant="outlined"
                name="description"
                value={input.description}
                onChange={changeHandler}
            />
            <TextField
                select
                id="priority-select"
                name="priorityLevel"
                label="Priority"
                value={input.priorityLevel}
                onChange={changeHandler}
            >
                {priorityLevelInput.map(ele => 
                    <MenuItem value={ele.value} key={ele.label}>
                        {ele.label}
                    </MenuItem>
                )}
            </TextField>
            <MuiChipsInput                 
                label="Tags"
                variant="outlined"
                name="tags"
                value={tags}
                onChange={changeChip}
            />
            <Button variant="outlined" type="submit">Update</Button>    
        </Box>
    );
};

export default ChecklistUpdate;