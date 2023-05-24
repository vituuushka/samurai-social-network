import React, { Suspense } from 'react';
import './App.css';
import HeaderContainer from "./components/Header/HeaderContainer";
import Navbar from "./components/Navbar/Navbar.js";
// import DialogsContainer from "./components/Dialogs/Dialogs-container";
// import News from "./components/News/News.js";
// import Music from "./components/Music/Music.js";
// import Settings from "./components/Settings/Settings.js";
import {Route, Routes} from 'react-router-dom';
// import UsersContainer from './components/Users/Users-container';
// import ProfileContainer from './components/Profile/ProfileContainer';
// import Login from './components/Login/login';
import { connect } from 'react-redux';
import {
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { compose } from 'redux';
import { initializeApp } from './redux/app-reducer';
import Preloader from './components/commons/preloader/preloader';

const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'));
const DialogsContainer = React.lazy(() => import('./components/Dialogs/Dialogs-container'));
const UsersContainer = React.lazy(() => import('./components/Users/Users-container'));
const News = React.lazy(() => import('./components/News/News.js'));
const Music = React.lazy(() => import('./components/Music/Music.js'));
const Settings = React.lazy(() => import('./components/Settings/Settings.js'));
const Login = React.lazy(() => import('./components/Login/login'));

class App extends React.Component {
  componentDidMount () {
    this.props.initializeApp();
  }
  render() {
    if(!this.props.initialized) {
      return <Preloader/>
    }
  return ( 
    <div className="app-wrapper">
      <HeaderContainer/>
      <Navbar/>
      <div className="app-wrapper-content">
        <Suspense fallback={<Preloader/>} >
        <Routes>
        <Route path='/profile/:profileId' element= {<ProfileContainer  />} />
        <Route path='/profile/*' element= {<ProfileContainer  />} />
        
        <Route exact path='/dialogs/*' element={<DialogsContainer />} />
        <Route path='/users/*' element={<UsersContainer />} />

        <Route path='/news/*' element={ <News />} />
        <Route path='/music/*' element={ <Music />} />
        <Route path='/settings/*' element={<Settings />} />
        <Route path='/login/*' element={<Login />} />
        </Routes>
        </Suspense>
      </div>
    </div>
  )
}
};
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

const mapStateToProps = (state) => ({
  initialized: state.app.initialized
})


export default compose(
  connect(mapStateToProps, {initializeApp}),
  withRouter
)(App);