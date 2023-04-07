import React, { useState } from "react";
import { Box, Typography, TextField, Select, MenuItem, InputLabel, Button } from "@mui/material";

const AddChecklistForm = () => {
    const [input, setInput] = useState({
        description: '',
        priorityLevel: '',
    })

    const priorityLevelInput = [
        {value: 'high', label: 'High'},
        {value: 'medium', label: 'Medium'},
        {value: 'low', label: 'Low'},
    ];

    const submitHandler = (ev) => {
        ev.preventDefault()
        console.log(input)
    };

    const changeHandler = (ev) => {
        setInput({...input, [ev.target.name]:ev.target.value});
    };

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
            <Button variant="outlined" type="submit">Add</Button>    

        </Box>
    )
};

export default AddChecklistForm;