
import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import Navbar from './components/Navbar/Navbar';
import Signup from './containers/Signup/Signup';
import Login from './containers/Login/Login';
import Error from './components/Error/Error';
import HomePage from './containers/HomePage/HomePage';

import * as actionCreators from './actions/index';
import classes from './App.module.css';

class App extends Component{
  
  componentDidMount(){
    const token = localStorage.getItem('token');
    const userDetails = JSON.parse(localStorage.getItem('userDetails'));
    if( token && userDetails ){
      this.props.setStatusToLogin(userDetails, token);
      this.props.history.push('/');
    }
  }

  logoutHandler = () => {
    this.props.setStatusToLogout();
    this.props.history.push('/');
  }


  render(){
    return (
      <BrowserRouter>
        <div className={classes.RootContainer}>
          <Navbar isAuth={this.props.isAuth} logoutHandler={this.logoutHandler} userInfo={this.props.userInfo}/>
          <div className={classes.ContentContainer}>
            <Switch>
              <Route exact path='/signup' component={Signup}/>
              <Route exact path='/login' component={Login} />
              <Route exact path='/error' component={Error} />
              <Route path='/' component={HomePage} />
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    )
  }
}

const mapStateToProps = state => {
  return {
    isAuth: state.auth.isAuth,
    userInfo: state.auth.userDetails
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setStatusToLogin: (userDetails, token) => dispatch(actionCreators.setStatusToLogin(userDetails, token)),
    setStatusToLogout: () => dispatch(actionCreators.setStatusToLogout())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(App));
