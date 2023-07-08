import React from "react";
import MyPostsContainer from './MyPosts/MyPosts-container.js'
import ProfileInfo from "./ProfileInfo/ProfileInfo.js";
import s from "./Profile.module.css";
import Post from "./MyPosts/Post/Post.js";
import Profile from "./Profile.js";
import {getUserProfile, getStatus, updateStatus, savePhoto, saveProfile } from "../../redux/profilePage-reducer.js";
import axios from "axios";
import { connect } from "react-redux";
import {
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { withAuthRedirect } from "../../hoc/withAuthRedirect.js";
import { compose } from "redux";


class ProfileContainer extends React.Component {
  refreshProfile() {
    let profileId = this.props.router.params.profileId
    if(!profileId) {
      profileId=this.props.authorizedUserId
    }
    this.props.getUserProfile(profileId);
    this.props.getStatus(profileId);
  }
  componentDidMount() {
    this.refreshProfile()
  }
  componentDidUpdate(prevProps,prevState,snapshot) {
    if( this.props.router.params.profileId != prevProps.router.params.profileId) {
    this.refreshProfile()
  }
  }
  render() {
   
  return (<Profile {...this.props} profile={this.props.profile}
     status={this.props.status} updateStatus={this.props.updateStatus}
     isOwner={!this.props.router.params.profileId} 
     savePhoto={this.props.savePhoto} saveProfile={this.props.saveProfile} />)
}
};

let mapStateToProps = (state) => {
return {
  profile: state.profilePage.profile,
  status: state.profilePage.status,
  authorizedUserId: state.auth.id,
  isAuth: state.auth.isAuth
}
}
function withRouter(Container) {
  function ComponentWithRouterProp(props) {
    let location = useLocation();
    let navigate = useNavigate();
    let params = useParams();
    return (
      <Container
        {...props}
        router={{ location, navigate, params }}
      />
    );
  }

  return ComponentWithRouterProp;
}


export default compose(
  connect(mapStateToProps,{getUserProfile, getStatus, updateStatus, savePhoto, saveProfile}),
  withRouter,
  withAuthRedirect
)(ProfileContainer)