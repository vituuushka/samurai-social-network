import React from "react";
import { NavLink } from "react-router-dom";
import userPhoto from '../assets/images/userphoto.png';
import styles from './Users.module.css';

let User = (props) => {
        return (<div >
                <span>
                <div>
                <NavLink to={'/profile/' + props.user.id} >
                    <img className= {styles.userPhoto} src={props.user.photos.small !== null ? props.user.photos.small : userPhoto} />
                </NavLink>
                    </div>
                <div>
                    {props.user.followed ? <button disabled={props.followingInProgress.some(id=> id===props.user.id)} onClick = {()=>{
                        props.unfollow(props.user.id);
                    }
                    } >Unfollow</button> 
                    : <button disabled={props.followingInProgress.some(id=> id===props.user.id)} onClick = {()=>{
                        props.follow(props.user.id)   
                    }
                    } >Follow</button> }
                </div>
            </span>
            <span>
                <div>{props.user.name}</div>
                <div>{props.user.status}</div>
            </span>
            <span>
                <div>{'props.user.location.city'}</div>
                <div>{'props.user.location.country'}</div>
            </span>
                </div> )
}

    
    

    
    

export default User;