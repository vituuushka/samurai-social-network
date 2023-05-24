import React from "react";
import s from "./Dialogs.module.css";
import DialogItem from "./DialogItem/DialogItem.js";
import Message from "./Message/Message.js";
import { Navigate } from "react-router-dom";



const Dialogs = (props) => {
  let state = props.dialogsPage;
  let newMessageBody = state.newMessageBody;
  let dialogsElements = state.dialogs.map( (d,id) => <DialogItem name={d.name} id={d.id} key={id} /> )
  let messagesElements = state.messages.map((m,id) => <Message message={m.message} key={id} />)

let onSendMessageClick = () => {
  props.sendMessage();
}
let onNewMessageChange = (e) => {
let body = e.target.value;
props.updateNewMessageBody(body);
}
if(!props.isAuth) return <Navigate to='/login' />
  return (
    <div>
      <div className={s.dialogs}>
        <div className={s.dialogsItems}>
          {dialogsElements}
        </div>
        <div className={s.messages}>
          {messagesElements}
          <div>
        <textarea value = {newMessageBody} onChange = {onNewMessageChange} ></textarea>
      </div>
      <div>
        <button onClick={onSendMessageClick}>Send</button>
      </div>
        </div>
      </div>
      
    </div>
  );
};
export default Dialogs;
