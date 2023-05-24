import React from "react";
import s from './Header.module.css';
import { NavLink } from "react-router-dom";

const Header = (props) => {
    return <div className={s.header}>
        <img src="https://cdn.sribu.com/assets/media/contest_attachment/36ee591a3f6bca76c2879c21ab0907d4/4043040a00.jpg" />
        <div className={s.loginBlock}>
          {props.isAuth ? <div> {props.login} <button onClick={props.logout}>logout</button></div> : <NavLink to={'/login'} >Login</NavLink> }
          
        </div>
        </div>
    
}
export default Header