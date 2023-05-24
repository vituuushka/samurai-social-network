import React from "react";
import { NavLink } from "react-router-dom";
import userPhoto from '../assets/images/userphoto.png';
import styles from './Users.module.css';
import Pagination from "../commons/Pagination/Pagination";
import User from "./User";

let Users = (props) => {
        return (<div>
            <Pagination totalUsersCount={props.totalUsersCount} pageSize={props.pageSize} 
            onPageChanged={props.onPageChanged} currentPage={props.currentPage} 
            portionSize={props.portionSize} />
            
           {props.users.map( u => <User user={u} followingInProgress={props.followingInProgress}
           unfollow={props.unfollow} follow={props.follow}
            />)}
        </div>)
    }
    

    
    

export default Users;