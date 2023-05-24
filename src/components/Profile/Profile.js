import React from "react";
import MyPostsContainer from './MyPosts/MyPosts-container.js'
import ProfileInfo from "./ProfileInfo/ProfileInfo.js";
import s from "./Profile.module.css";
import Post from "./MyPosts/Post/Post.js";

const Profile = (props) => {
 
  return (
    <div>
      <ProfileInfo profile={props.profile} status={props.status} updateStatus={props.updateStatus}/>
      <MyPostsContainer  />
    </div>
  );
};
export default Profile;
