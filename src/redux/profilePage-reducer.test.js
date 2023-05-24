import profilePageReducer from "./profilePage-reducer";
import React from "react";

let state = {
  posts : [
      {id: 1, message: 'Hello!', likesCount: 15},
      {id: 2, message: "It's my first post", likesCount: 16}
    ],
    newPostText: '',
    profile: null,
    status: ''
}
test('posts length should be incremented', () => {
  let action = addPostActionCreator('mew mew')
  let newState = profilePageReducer(state,action)
  expect (newState.posts.length).toBe(3)
});
