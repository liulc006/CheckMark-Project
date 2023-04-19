import axios from 'axios';

const auth = (state = {}, action) =>{
    if(action.type === 'SET_AUTH'){
        return action.auth;
    }
    return state;
};

export const logout = (navigate) => {
    return async(dispatch) => {
        window.localStorage.removeItem('token');
        dispatch({type: 'SET_AUTH', auth:{} });
        navigate('/')
    };
};

//Authorization => Logging in
export const loginWithToken = () => {
    return async(dispatch) => {
        const token = window.localStorage.getItem('token');
        if(token){        
            const response = await axios.get('/api/auth', {
                headers:{
                    authorization: token
                }
            });
            dispatch({type: 'SET_AUTH', auth: response.data});
        }
    };
};

//Authentication => Getting the token
export const attemptLogin = (credential) => {
    return async(dispatch) => {
        const token = await axios.post('/api/auth', credential);
        window.localStorage.setItem('token', token.data);
        dispatch(loginWithToken());
    };
};

//Add new users to database
export const createUser = (credential, navigate) => {
    return async(dispatch) => {
        const token = await axios.post('/api/auth/register', credential);
        console.log(token);
        window.localStorage.setItem('token', token.data);
        //Login after creating a new user
        dispatch(loginWithToken());
        navigate('/');
    };
};

export default auth;