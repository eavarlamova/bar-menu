import React from 'react';
import { useSelector } from 'react-redux';
import {
  Route,
  Switch,
  Redirect,
  BrowserRouter as Router,
} from "react-router-dom"

import Home from "./view/pages/Home";
import Personal from "./view/pages/Personal";
import SignIn from './view/pages/SignIn';
import SignUp from './view/pages/SignUp';


const PrivateRouter = ({
  isAuth,
  pathForRoute,
  pathForRedirect = '/',
  component: Component,
}) => (
  isAuth
    ?
    <Redirect to={pathForRedirect} />
    :
    <Route component={Component} path={pathForRoute} />
)

const App = () => {
  const { isAuth } = useSelector(state => state.users);

  return (
    <Router>
      <Switch>
        <Route path='/user' component={Personal} />
        <Route path='/signin' component={SignIn} />
        <PrivateRouter
          component={SignUp}
          pathForRoute={'/signup'}
          pathForRedirect={'/user'}
          isAuth={isAuth}
        />
        <Route path='/' component={Home} />
      </Switch>
    </Router>
  )
};

export default App;
