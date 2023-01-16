import React from 'react';
import s from "./MyPosts.module.css";
import Post from "./Post/Post";
import {PostsType, StateType, } from "../../../redux/store";
import {addPostCreator, updateNewPostTextCreator} from "../../../redux/profile-reducer";


//
// export type MyPostsTypeProps = {
//     posts: PostsType[]
//        dispatch:()=>void
//     newPostsText:string | number | readonly string[] | undefined
//     pushPost:()=>void
//     updateNewPostText:(newText:string | number | readonly string[] | undefined)=>void
// }

// const a = [1, 2,3,4].map(() => ())
// const a = [1, 2,3,4].map((el, index) => {
//     const bl   a = () => {}
// return index === 2 ? <></> : <>{'bla bla'}</>) }))


 const MyPosts = (props: any) => {
debugger
    // let state = props.store.getState()
    // let postsElement = props.store.getState().newPostsText
  let  posts = props.posts

    let postElements =
       posts.map((p:any) => (<Post
                id={p.id}
                message={p.message}
                likesCount={p.likesCount}/>
        ))

    let onAddPost = () => {

    props.addPost()
    }

 let   onPostChange = (e:any) => {
        debugger

     let text = e.target.value
         props.updateNewPostText(text);
         // let action = { type: 'UPDATE-NEW-POST-TEXT',text: text};


     }

    return <div>

        <div className={s.content}>
            <div className={s.my}>My Posts</div>
            <div><textarea
                           onChange={onPostChange}
                           value={props.newPostsText}
                           className={s.text}></textarea></div>
            <div>
                <button role="button" className={s.button}
                        onClick={onAddPost}>
                    AddPost</button>
            </div>
            <div className={s.new}>New Post</div>

            <div className={s.posts}>
                {postElements}


            </div>
        </div>

    </div>
}


    export default MyPosts;