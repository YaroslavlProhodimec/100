import {getUserData,} from "./auth-reducer";

const SET_INITIALIZED = 'SET_INITIALIZED';


let initialState = {
    initialized: false,

}
const appReducer = (state = initialState, action: any) => {

    switch (action.type) {
        case SET_INITIALIZED :
            return {
                ...state,
                initialized: true

            }

        default :
            return state;
    }
}

export const setInitialized = () => ({
    type: SET_INITIALIZED,

})
export const initializeApp = () => (dispatch: any) => {
    let promise = dispatch(getUserData())
    Promise.all([promise])
        .then(() => {
            dispatch(setInitialized())
        })
}
export default appReducer;