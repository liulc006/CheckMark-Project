import React, {useEffect} from "react";
import ChecklistCard from "./ChecklistCard";
import { useDispatch, useSelector } from "react-redux";
import { fetchChecklist } from "../store";
import { Grid, Button, Box, Card, CardActionArea } from "@mui/material";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';


const ChecklistGrid = () => {
    const { checklist } = useSelector(state => state);
    const dispatch = useDispatch();

    useEffect(()=> {
        dispatch(fetchChecklist());
    }, []);

    const addChecklist = () => {
        console.log('Add Checklist')
    }

    return (
        <>
            <h1>Checklist:</h1>
            <Grid container spacing={2} sx={{width: 'auto', border:'solid black 1px', margin:'0 20 0 20',
            display:'flex'
            }}>
                {checklist?.map(ele => {
                    return (
                        <Grid key={ele._id} item xs={6} md={4} lg={3} sx={{}}>
                            <ChecklistCard key={ele._id} checklistObj={ele} />
                        </Grid>
                    )})
                }
                <Grid key='new checklist' item xs={6} md={4} lg={3} sx={{}}>
                    <Box>
                        <Card variant="outlined" sx={{
                            borderWidth: '10px',
                            borderColor: "gray",
                            display: 'flex',
                            minHeight:100,
                            justifyContent:'center',
                            textAlign:'center'
                        }}>
                            <CardActionArea onClick={addChecklist}>
                                {/* <Button variant="outlined">Completed?</Button> */}
                                <AddCircleOutlineIcon sx={{color:'blue'}}/>
                            </CardActionArea>
                        </Card>
                    </Box>
                </Grid>

            </Grid>
        </>
    );
};

export default ChecklistGrid;