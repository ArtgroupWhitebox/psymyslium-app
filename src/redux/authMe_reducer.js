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
                ...action.payload
            }

        default: return (state)
    }
}
export default authMeReducer

export const setAuthMeData = (id, email, login, isAuth) => ({ type: SET_AUTH_ME_DATA, payload: {id, email, login, isAuth} })

export const getAuthMeThunk = () => {
    return (dispatch) => {

        return authAPI.getAuthMe().then(data => {
            const {id, email, login} = data.data        
            data.resultCode === 0 && dispatch(setAuthMeData(id, email, login, true))
        })
    }
}

export const loginThunk = (email, password, rememberMe) => {
    return (dispatch) => {

        authAPI.login(email, password, rememberMe).then(data => {                   
            data.resultCode === 0 && dispatch(getAuthMeThunk())
        })
    }
}

export const logoutThunk = () => {
    return (dispatch) => {

        authAPI.logout().then(data => {                   
            data.resultCode === 0 && dispatch(setAuthMeData(null, null, null, false))
        })
    }
}