const UPDATE_NEW_MESSAGE_BODY = 'UPDATE-NEW-MESSAGE-BODY';
const SEND_MESSAGE = 'SEND-MESSAGE';

let initialState = {
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
}
const dialogsPageReducer = (state=initialState, action) => {
    switch (action.type) {
    case UPDATE_NEW_MESSAGE_BODY: 
    return {
      ...state,
      newMessageBody: action.body
    }
    case SEND_MESSAGE: 
    let body = state.newMessageBody;
    return {
      ...state,
      newMessageBody: '',
      messages: [...state.messages,{id:6, message: body}]
    }
    default:
    return state;
  }
}

export let sendMessageCreator = () => ({type: SEND_MESSAGE});
export let updateNewMessageBodyCreator = (body) => ({type: UPDATE_NEW_MESSAGE_BODY, body: body })

export default dialogsPageReducer;