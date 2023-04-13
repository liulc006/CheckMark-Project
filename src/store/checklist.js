import axios from "axios";

const checklist = (state=[], action) => {
    if(action.type === 'FETCH_CHECKLIST'){
        return action.checklist;
    }
    else if(action.type === 'ADD_CHECKLIST'){
        return [...state, action.checklist];
    }
    else if(action.type === 'DELETE_CHECKLIST'){
        return state.filter(ele => ele._id !== action.checklist._id)
    }

    return state;
};

export const fetchChecklist = () => {
    return async(dispatch) => {
        const token = window.localStorage.getItem('token');
        if(token){
            const response = await axios.get(`/api/checklist/`,{
                headers:{
                    authorization: token
                }
            });
            dispatch({type:'FETCH_CHECKLIST', checklist: response.data});
        };
    };
};

export const addChecklist = (newChecklist) => {
    return async(dispatch) => {
        const token = window.localStorage.getItem('token');
        const response = await axios.post('/api/checklist/add', newChecklist,{
            headers:{
                authorization: token
            }
        });
        dispatch({type: 'ADD_CHECKLIST', checklist: response.data});
    };
};

export const deleteChecklist = (checklistObj) => {
    return async(dispatch) => {
        const token = window.localStorage.getItem('token');
        await axios.delete('/api/checklist/delete', {
            headers:{
                authorization: token
            },
            data: checklistObj
        });

        dispatch({type:'DELETE_CHECKLIST', checklist: checklistObj})
    };
};


export default checklist;