
import MyPosts  from "./MyPost/MyPosts";
import Profileinfo from "./Profileinfo/Profileinfo";
import {PostsType} from "../../redux/state";

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
            <MyPosts store={props.store} />
        </div>
    );//newPostText={props.profilePage.newPost} cоздали и протащили через пропсы прописывали их в app.js потом profile.jsx
};
export default Profile;
