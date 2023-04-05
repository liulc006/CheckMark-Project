import axios from "axios";

const checklist = (state=[], action) => {
    if(action.type === 'FETCH_CHECKLIST'){
        return action.checklist;
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
        }
    }
}

export default checklist;