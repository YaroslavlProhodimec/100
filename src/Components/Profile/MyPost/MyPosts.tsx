import React from 'react';
import s from "./MyPosts.module.css";
import Post from "./Post/Post";
import {addPostCreator, PostsType, StateType, updateNewPostTextCreator} from "../../../redux/state";


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
//     const bla = () => {}
// return index === 2 ? <></> : <>{'bla bla'}</>) }))


export const MyPosts = (props: any) => {
debugger
    let state = props.store.getState()
    let postsElement = props.store.getState().newPostsText


    let postElements =
        state.posts.map((p:any) => (<Post
                id={p.id}
                message={p.message}
                likesCount={p.likesCount}/>
        ))
    let newPostElement = React.createRef<HTMLTextAreaElement>()
    let addPost = () => {
        // if (newPostElement.current) {
            // let text = newPostElement.current.value;
            // props.dispatch({type:'ADD-POST'});
        props.store.dispatch( addPostCreator());

            // newPostElement.current.value= ''
            // props.updateNewPostText('')
        // }
    }

 let   onPostChange = (e:any) => {
        debugger

     let text = e.target.value
         props.store.dispatch(updateNewPostTextCreator(text));
         // let action = { type: 'UPDATE-NEW-POST-TEXT',text: text};


     }

    return <div>

        <div className={s.content}>
            <div className={s.my}>My Posts</div>
            <div><textarea
                           onChange={onPostChange}
                           value={postsElement}
                           className={s.text}></textarea></div>
            <div>
                <button role="button" className={s.button}
                        onClick={addPost}>
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