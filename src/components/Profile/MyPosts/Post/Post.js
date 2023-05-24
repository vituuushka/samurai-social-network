import React from "react";
import s from'./Post.module.css';

const Post = (props) => {
    return (
            <div className={s.item}>
              <img src="https://storage.pixteller.com/designs/designs-images/2019-03-27/05/simple-background-backgrounds-passion-simple-1-5c9b95bd34713.png" />
            {props.message}
            <div>
            <span>like:</span>
            {props.likesCount}
            </div>
            </div>  
    )
}
export default Post