import React from "react";
import s from'./MyPosts.module.css';
import Post from "./Post/Post.js";
import { memo } from "react";


const MyPosts = React.memo( (props) => {
  console.log('memo')
  let postsElements = props.posts.map((p, id) => <Post message={p.message} likesCount={p.likesCount} key={id} />)
  let newPostElement = React.createRef()
  
  let onAddPost = () => {
props.addPost();
  }
  let onPostChange = () => {
    let text = newPostElement.current.value;
  props.updateNewPostText(text)
  }
      return (
      <div className={s.postsBlock} >
        <h3>My posts</h3>
        <div>
          <div>
        <textarea onChange = {onPostChange} ref={newPostElement} value={props.newPostText}></textarea>
        </div>
        <div>
        <button onClick={onAddPost}>Add post</button>
        </div>
        </div>
        <div>
          <h4>New posts</h4>
          </div>
        <div className={s.posts}>
          {postsElements}
        </div>
      </div>
    )
    
})
export default MyPosts;