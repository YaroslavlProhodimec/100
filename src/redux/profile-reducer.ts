import {profileAPI, userAPI} from "../api/api";
import {stopSubmit} from "redux-form";

const ADD_POST = 'ADD_POST';
const UPDATE_NEW_POST_TEXT = 'UPDATE_NEW_POST_TEXT';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_STATUS = 'SET_STATUS'
const  SAVE_PHOTO_SUCCESS = ' SAVE_PHOTO_SUCCESS'
let initialState = {
    posts: [
        {id: 1, message: 'Hi,how are you?', likesCount: 12},
        {id: 2, message: 'My first project?', likesCount: 11},

    ],
    // newPostsText: 'kamasutra',
    profile: null,
    status: ""

}
const profileReducer = (state= initialState, action: any) => {

    switch (action.type) {
        case ADD_POST: {
            let newPost =  action.updateNewPostText
            return {
                ...state,
                posts: [...state.posts, {id: 2, message: newPost, likesCount: 11}],

            }
        }
        // case UPDATE_NEW_POST_TEXT: {
        //     return {
        //         ...state,
        //         newPostsText: action.text
        //     }
        // }
        case SET_USER_PROFILE: {
            return {
                ...state,
                profile: action.profile
            }
        }
        case SET_STATUS: {
            return {
                ...state,
                status: action.status
            }
        }
        case SAVE_PHOTO_SUCCESS: {
            return {...state, profile: {...state.profile, photos:action.photos}}
        }
        default:
            return state;
    }
}
export let addPostCreator = (updateNewPostText:any) => ({type: 'ADD_POST',updateNewPostText})
let setUserProfile = (profile: any) => ({type: SET_USER_PROFILE, profile})
let setStatus = (status:any) => ({type: SET_STATUS, status})
let setPhotoSuccess = (photos:any) => ({type: SAVE_PHOTO_SUCCESS, photos})
export let getUserProfile = (userId: any) => (dispatch:any) => {
    userAPI.getProfile(userId).then((response) => {
        dispatch(setUserProfile(response.data));
    })
}

export let getUserStatus = (userId: any) => (dispatch:any) => {
    profileAPI.getStatus(userId).then(response => {
        dispatch(setStatus(response.data));
    })
}
export let updateStatus = (status: any) => (dispatch:any) => {
    profileAPI.updateStatus(status).then(response => {
        if(response.data.resultCode === 0) {
            dispatch(setStatus(response.data));
        }
    })
}
export let savePhoto = (file: any) => async (dispatch:any) => {
    let response = await  profileAPI.savePhoto(file)
    if(response.data.resultCode === 0) {
        dispatch(setPhotoSuccess(response.data.data.photos));
    }

}
export let saveProfile = (file: any) => async (dispatch:any,getState:any) => {
    const userId = getState().auth.userId
    let response = await profileAPI.saveProfile(file)
    if(response.data.resultCode === 0) {
        dispatch(getUserProfile(userId))
    }
    else{
        dispatch(stopSubmit('edit-profile',{"_error": response.data.messages[0]}))
        return Promise.reject(response.data.messages[0])
    }

}


// export let updateNewPostTextCreator = (text: string) => ({type: 'UPDATE_NEW_POST_TEXT', text: text})




export default profileReducer