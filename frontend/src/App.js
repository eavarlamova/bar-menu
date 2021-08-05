import React, { memo, useEffect } from 'react';
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



const App = () => {
  const { isAuth } = useSelector(state => state.users);
  
  useEffect(() => { 
    console.log('#######', 'app.js reload', '#######')
  }, [])

  const PrivateRouter = (props) => (
    isAuth
      ?
      <Route {...props} />
      :
      <Redirect to='/signin' />
  );

  return (
    <Router>
      <Switch>
        {/* <PrivateRouter component={Personal} path={'/user'} /> */}
        <Route path='/user' component={Personal} />
        <Route path='/signin' component={SignIn} />
        <Route path={'/signup'} component={SignUp} />
        <Route path='/' component={Home} />
      </Switch>
    </Router>
  )
};

export default memo(App);
