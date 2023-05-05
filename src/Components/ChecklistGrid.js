import React, {useEffect, useState} from "react";
import ChecklistCard from "./ChecklistCard";
import { useDispatch, useSelector } from "react-redux";
import { fetchChecklist } from "../store";
import { Grid, Button, Box, Card, CardActionArea, Typography, ToggleButton, ToggleButtonGroup } from "@mui/material";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import CancelTwoToneIcon from '@mui/icons-material/CancelTwoTone';
import Modal from "@mui/material/Modal";
import AddChecklistForm from "./AddChecklist";
import ChecklistDetail from "./ChecklistDetail";


const ChecklistGrid = () => {
    //checklistStatus let you view completed or on-going checklists
    const [checklistStatus, setChecklistStatus] = useState('open');

    //variable for displaying individual Checklist (Modal)
    const [ viewChecklist, setViewChecklist ] = useState({
        view: false,
        checklistObj: null,
    });
    //variable for displaying form to add new Checklist (Modal)
    const [ viewForm, setViewForm ] = useState(false);

    //Getting checklist data from store
    const { checklist } = useSelector(state => state);
    const dispatch = useDispatch();

    useEffect(()=> {
        dispatch(fetchChecklist());
    }, []);

    const addChecklist = () => {
        //set modal view form to True to display the add checklist form
        setViewForm(true);
    };

    //Closing Checklist Detail modal
    const handleCloseModal = () => {
        setViewChecklist({
            view: false,
            checklistObj: null
        });
    };

    //Closing Add Checklist Form modal
    const handleCloseForm = () => {
        setViewForm(false);
    };

    //Change view for checklist grid
    const toggleChange = (ev) => {
        setChecklistStatus(ev.target.value);
    };

    return (
        <Box sx={{height:'90vh'}}>
            <h1>Checklist:</h1>
            <Box sx={{
                margin:'0 20 0 20'
            }}>
                <ToggleButtonGroup
                    color="primary"
                    value={checklistStatus}
                    exclusive
                    onChange={toggleChange}
                    aria-label="Platform"
                >
                    <ToggleButton value="open">On Going</ToggleButton>
                    <ToggleButton value="close">Completed</ToggleButton>
                </ToggleButtonGroup>
                <Grid container spacing={2} sx={{width: 'auto',
                display:'flex', alignItems:'center'
                }}>
                    {checklist?.map(ele => {
                        if(ele.status === checklistStatus){
                            return (
                                <Grid key={ele._id} item xs={6} md={4} lg={3} sx={{}}>
                                    <CardActionArea onClick={()=>setViewChecklist({view:true,checklistObj: ele})}>
                                        <ChecklistCard key={ele._id} checklistObj={ele}/>
                                    </CardActionArea>    
                                </Grid>
                            )
                        }
                    })}
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
                                    <AddCircleOutlineIcon sx={{color:'blue'}}/>
                                </CardActionArea>
                            </Card>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
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
                    <ChecklistDetail key='modal checklist' checklistObj={viewChecklist.checklistObj} setView={setViewChecklist}/>
                </Box>
            </Modal>
            <Modal key='form modal'
                open={viewForm}
                onClose={handleCloseForm}
            >
                <>
                    <AddChecklistForm />
                </>
            </Modal>
        </Box>
    );
};

export default ChecklistGrid;