import React from 'react';
import s from "./MyPosts.module.css";
import Post from "./Post/Post";
import { PostsType, StateType} from "../../../redux/state";



export type MyPostsTypeProps = {
    posts: PostsType[]
       dispatch:()=>void
    newPostsText:string | number | readonly string[] | undefined
    pushPost:()=>void
    updateNewPostText:(newText:string | number | readonly string[] | undefined)=>void
}

// const a = [1, 2,3,4].map(() => ())
// const a = [1, 2,3,4].map((el, index) => {
//     const bla = () => {}
// return index === 2 ? <></> : <>{'bla bla'}</>) }))
export const MyPosts = (props: any) => {
debugger
    let postElements: JSX.Element[] =
        props.posts.map((p:any) => (<Post
                id={p.id}
                message={p.message}
                likesCount={p.likesCount}/>
        ))
    let newPostElement = React.createRef<HTMLTextAreaElement>()
    let addPost = () => {
        // if (newPostElement.current) {
            // let text = newPostElement.current.value;
            props.dispatch({type:'ADD-POST'});
            // newPostElement.current.value= ''
            // props.updateNewPostText('')
        // }
    }
 let   onPostChange = () => {
        debugger
     if (newPostElement.current) {
         let text = newPostElement.current.value;
         let action = { type: 'UPDATE-NEW-POST-TEXT',text: text};
         props.dispatch(action)

     }
 }
    return <div>

        <div className={s.content}>
            <div className={s.my}>My Posts</div>
            <div><textarea ref={newPostElement}
                           onChange={onPostChange}
                           value={props.newPostsText}
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