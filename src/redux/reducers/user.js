import axios from 'axios';

const initState = {
    userAuth: null,
    error:'',
}
const UserReducer = async (state = initState, action) => {
    switch (action.type) {
        case "AUTH_USER":
            try {
                const res = await axios.post('/auth',action.playload)
                localStorage.setItem('user',JSON.stringify(res.data.user))
                localStorage.setItem('token',res.data.token)
                return { ...state, userAuth: res.data.user }  
            } catch (error) {
                return { ...state, error: error}  
            }
        default:
            return state;
    }
}

export default UserReducer;