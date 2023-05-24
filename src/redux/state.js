import profilePageReducer from "./profilePage-reducer";
import dialogsPageReducer from "./dialogsPage-reducer";
import sidebarPageReducer from "./sidebar-reducer";

const ADD_POST = 'ADD-POST';
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';
const UPDATE_NEW_MESSAGE_BODY = 'UPDATE-NEW-MESSAGE-BODY';
const SEND_MESSAGE = 'SEND-MESSAGE';

let store = {
  _state: {
    profilePage: {
      posts : [
      {id: 1, message: 'Hello!', likesCount: 15},
      {id: 1, message: "It's my first post", likesCount: 16}
    ],
      newPostText: ''
  },
    dialogsPage: {
      dialogs: [
      {id: 1, name: 'Viktor'},
      {id: 2, name: 'Dmitriy'},
      {id: 3, name: 'Anur'},
      {id: 4, name: 'Lena'},
      {id: 5, name: 'Masha'}
    ],
  messages: [
      {id: 1, message: 'Hi'},
      {id: 2, message: 'How are you?'},
      {id: 3, message: 'What are you doing now?'}
    ],
    newMessageBody: ''
  },
    sidebar: {}
},
_callSubscriber () {
  console.log('mew mew')
},
getState() {
  return this._state;
},
subscribe (observer) {
  this._callSubscriber = observer;
},



dispatch (action) {
  this._state.profilePage = profilePageReducer (this._state.profilePage, action);
  this._state.dialogsPage = dialogsPageReducer (this._state.dialogsPage, action);
  this._state.sidebar = sidebarPageReducer (this._state.sidebar, action);
  
  this._callSubscriber(this._state);
}
}





export default store;