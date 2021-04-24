import { authAPI } from "../components/axiosAPI/api"

const SET_AUTH_ME_DATA = 'SET_AUTH_ME_DATA'

let initialState = {

    id: null,
    email: null,
    login: null,
    isAuth: false 
}

const authMeReducer = (state=initialState, action) => {
      
    switch (action.type) {

        case SET_AUTH_ME_DATA:
                      
            return {
                ...state,
                ...action.data,
                isAuth: true 
            }

        default: return (state)
    }
}
export default authMeReducer

export const setAuthMeData = (id, email, login) => ({ type: SET_AUTH_ME_DATA, data: {id, email, login} })

export const getAuthMeThunk = () => {
    return (dispatch) => {

        authAPI.getAuthMe().then(data => {
            const {id, email, login} = data.data        
            data.resultCode === 0 && dispatch(setAuthMeData(id, email, login))
        })
    }
}
