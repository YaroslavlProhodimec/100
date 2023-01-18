import Profileinfo from "./Profileinfo/Profileinfo";
import MyPostsContainer from "./MyPost/MyPostsContainer";

//
// export type ProfileTypeProps = {
//     posts: PostsType[]
//     pushPost: (postMessage: string) => void
// }

const Profile = (props:any) => {
debugger
    return (
        <div >
            <Profileinfo />

            <MyPostsContainer   />
        </div>
    );//newPostText={props.profilePage.newPost} cоздали и протащили через пропсы прописывали их в app.js потом profile.jsx
};
export default Profile;
