import React from "react";
import s from'./Navbar.module.css';
import { NavLink } from "react-router-dom";

const Navbar = () => {
    return ( 
    <nav className={s.nav}>
      <div>
        <div className={s.item}>
          <NavLink to="/profile" activeclassname={s.active}>Profile</NavLink>
        </div>
        <div className={s.item} >
          <NavLink to="/dialogs" activeclassname={s.active}>Messages</NavLink>
        </div>
        <div className={s.item}>
          <NavLink to="/news" activeclassname={s.active}>News</NavLink>
        </div>
        <div className={s.item}>
          <NavLink to="/music" activeclassname={s.active}>Music</NavLink>
        </div>
        <div className={s.item}>
          <NavLink to="/users" activeclassname={s.active}>Users</NavLink>
        </div>
        <div className={s.item}>
          <NavLink to="/settings" activeclassname={s.active}>Settings</NavLink>
        </div>
      </div>
    </nav>
    )
}
export default Navbar