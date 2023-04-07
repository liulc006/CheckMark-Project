import React, {useEffect, useState} from "react";
import ChecklistCard from "./ChecklistCard";
import { useDispatch, useSelector } from "react-redux";
import { fetchChecklist } from "../store";
import { Grid, Button, Box, Card, CardActionArea, Typography } from "@mui/material";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import CancelTwoToneIcon from '@mui/icons-material/CancelTwoTone';
import Modal from "@mui/material/Modal";


const ChecklistGrid = () => {
    const [ viewChecklist, setViewChecklist ] = useState({
        view: false,
        checklistObj: null,
    });
    const { checklist } = useSelector(state => state);
    const dispatch = useDispatch();

    useEffect(()=> {
        dispatch(fetchChecklist());
    }, []);

    const addChecklist = () => {
        console.log('Add Checklist')
    }

    useEffect(()=>{
        console.log(viewChecklist)
    }, [viewChecklist])

    const handleCloseModal = () => {
        setViewChecklist({
            view: false,
            checklistObj: null
        });
    };


    return (
        <>
            <h1>Checklist:</h1>
            <Grid container spacing={2} sx={{width: 'auto', margin:'0 20 0 20',
            display:'flex', alignItems:'center'
            }}>
                {checklist?.map(ele => {
                    return (
                        <Grid key={ele._id} item xs={6} md={4} lg={3} sx={{}}>
                            <CardActionArea onClick={()=>setViewChecklist({view:true,checklistObj: ele})}>
                                <ChecklistCard key={ele._id} checklistObj={ele}/>
                            </CardActionArea>    
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
            <Modal
                open={viewChecklist.view}
            >
                <Box sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 400,
                    bgcolor: 'background.paper',
                    border: '2px solid #000',
                    boxShadow: 24,
                    }}
                >
                    <Button onClick={handleCloseModal} sx={{position:'absolute', left:'92.5%', bottom:'90%'}}>
                        <CancelTwoToneIcon sx={{color:'white'}}/>
                    </Button>
                    <ChecklistCard key='modal checklist' checklistObj={viewChecklist.checklistObj} singleView={setViewChecklist}/>
                </Box>
            </Modal>
        </>
    );
};

export default ChecklistGrid;