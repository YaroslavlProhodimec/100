import {PostsType} from "./store";
const ADD_POST = 'ADD_POST';
const UPDATE_NEW_POST_TEXT = 'UPDATE_NEW_POST_TEXT';


let initialState = {
    posts: [
        {id: 1, message: 'Hi,how are you?', likesCount: 12},
        {id: 2, message: 'My first project?', likesCount: 11},

    ], newPostsText: 'kamasutra',
}
 const profileReducer = (state=initialState,action: { type: string; text: string; }) => {
     debugger
     let stateCopy = {
         ...state
     }
        if (action.type === ADD_POST) {
            let text = stateCopy.newPostsText
            stateCopy.newPostsText = '';
            stateCopy.posts.push({likesCount: 0, id: 3, message: text} as PostsType)


        }

        else if(action.type === UPDATE_NEW_POST_TEXT) {
            stateCopy.newPostsText = action.text;


        }


    return stateCopy;
}

export let addPostCreator = () => ({type: 'ADD_POST'})
export let updateNewPostTextCreator = (text: string) => ({type: 'UPDATE_NEW_POST_TEXT' ,text: text})
export default profileReducer