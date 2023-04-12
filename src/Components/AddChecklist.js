import React, { useState } from "react";
import { Box, Typography, TextField, Select, MenuItem, InputLabel, Button } from "@mui/material";
import { MuiChipsInput } from 'mui-chips-input';
import { addChecklist } from "../store/checklist";
import { useDispatch } from "react-redux";

const AddChecklistForm = () => {
    const dispatch = useDispatch();

    const [input, setInput] = useState({
        description: '',
        priorityLevel: '',
    });
    const [tags, setTags] = useState([])

    const priorityLevelInput = [
        {value: 'high', label: 'High'},
        {value: 'medium', label: 'Medium'},
        {value: 'low', label: 'Low'},
    ];

    const submitHandler = (ev) => {
        ev.preventDefault();
        const submission = {...input, tags: tags};
        console.log(submission);
        dispatch(addChecklist(submission));
    };

    const changeHandler = (ev) => {
        setInput({...input, [ev.target.name]:ev.target.value});
    };

    const changeChip = (value) => {
        setTags(value);;
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
                width: 400,
                bgcolor: 'background.paper',
                border: '2px solid #000',
                boxShadow: 24,
                display: 'flex',
                flexDirection: 'column',
                '& > :not(style)': { m: 1, width: '25ch' },
            }}
        >
            <Typography>New Checklist</Typography>
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
            <Button variant="outlined" type="submit">Add</Button>    
        </Box>
    )
};

export default AddChecklistForm;