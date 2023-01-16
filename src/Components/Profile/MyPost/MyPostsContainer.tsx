import React from 'react';
import s from "./MyPosts.module.css";
import {addPostCreator, updateNewPostTextCreator} from "../../../redux/profile-reducer";
import MyPosts from "./MyPosts";
import Post from "./Post/Post";
import {connect} from "react-redux";
import Dialogs from "../../Dialogs/Dialogs";


// const MyPostsContainer = (props: any) => {
//     debugger
//
//     let addPost = () => {
//         props.store.dispatch(addPostCreator());
//     }
//     let onPostChange = (text: string) => {
//         debugger
//
//         props.store.dispatch(updateNewPostTextCreator(text));
//
//
//     }
//     return (
//         <StoreContext.Consumer>
//             {(store:any) => {
//                 let state = props.store.getState()
//                 let addPost = () => {
//                     store.dispatch(addPostCreator());
//                 }
//                 let onPostChange = (text: string) => {
//                     debugger
//
//                     store.dispatch(updateNewPostTextCreator(text));
//
//
//                 }
//
//                return  <MyPosts updateNewPostText={onPostChange}
//                          addPost={addPost}
//                          posts={state.profilePage.posts}
//                          newPostsText={state.getState().profilePage.newPostsText}/>}
//         }
//         </StoreContext.Consumer>
//                 }
let mapStateToProps = (state: any) => {
    return {
        posts: state.profilePage.posts,
        newPostsText: state.profilePage.newPostsText

    }


}
let mapDispatchToProps = (dispatch: any) => {
    return {

        addPost: () => {
            dispatch(addPostCreator())
        },
        updateNewPostText: (text:any) =>
        {dispatch(updateNewPostTextCreator(text))
        },
    }
}
const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps) (MyPosts);
export default MyPostsContainer;