import React from "react";
import { connect } from "react-redux";
import Users from "./Users";
import { follow, unfollow, setCurrentPage} from "../../redux/users-reducer";
import Preloader from "../commons/preloader/preloader";
import { tuggleFollowingInProgress } from "../../redux/users-reducer";
import { requestUsers } from "../../redux/users-reducer";
import { getUsers, getPageSize, getTotalUsersCount, getCurrentPage, getIsFetching, getFollowingInProgress, getPortionSize } from "../../redux/users-selectors";

class UsersContainer extends React.Component {
 
  componentDidMount () {
   this.props.requestUsers(this.props.currentPage, this.props.pageSize)
  }
 
  onPageChanged = (pageNumber) => {
    this.props.setCurrentPage(pageNumber);
  this.props.requestUsers(pageNumber, this.props.pageSize)
  }
  render() {
      return <>
      {this.props.isFetching ? <Preloader/> : null}
      <Users totalUsersCount={this.props.totalUsersCount} 
      pageSize={this.props.pageSize}
      portionSize={this.props.portionSize}
      onPageChanged={this.onPageChanged}
      currentPage={this.props.currentPage}
      users={this.props.users}
      unfollow={this.props.unfollow}
      follow={this.props.follow} 
      followingInProgress={this.props.followingInProgress} 
      tuggleFollowingInProgress={this.props.tuggleFollowingInProgress} 
      />
      </>
  }
  
}

const mapStateToProps = (state) => {
  return {
users: getUsers(state),
pageSize: getPageSize(state),
portionSize: getPortionSize(state),
totalUsersCount: getTotalUsersCount(state),
currentPage: getCurrentPage(state),
isFetching: getIsFetching(state),
followingInProgress: getFollowingInProgress(state)
  }
};
// const mapDispatchToProps = (dispatch) => {
//   return {
//     follow: (userId)=> {
//       dispatch(followAC(userId))
//     },
//     unfollow: (userId)=> {
//       dispatch(unfollowAC(userId))
//     },
//     setUsers: (users)=> {
//       dispatch(setUsersAC(users))
//     },
//     setCurrentPage: (pageNumber)=> {
//       dispatch(setCurrentPageAC(pageNumber))
//     },
//     setTotalUsersCount: (totalUsersCount) => {
//       dispatch(setTotalUsersCountAC(totalUsersCount))
//     },
//     tuggleIsFetching: (isFetching) => {
//       dispatch(tuggleIsFetchingAC(isFetching))
//     }
//   }
// }



export default connect(mapStateToProps, {
  follow,
  unfollow,
  setCurrentPage,
  tuggleFollowingInProgress,
  requestUsers,
  unfollow,
  follow
})(UsersContainer);
