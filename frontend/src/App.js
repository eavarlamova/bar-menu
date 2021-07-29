import React from 'react';
import {
  Route,
  Switch,
  BrowserRouter as Router,
} from "react-router-dom"

import Home from "./view/pages/Home";
import Personal from "./view/pages/Personal";
import SignIn from './view/pages/SignIn';
import SignUp from './view/pages/SignUp';


const App = () => (
  <Router>
    <Switch>
      <Route path='/user' component={Personal}/>
      <Route path='/signin' component={SignIn}/>
      <Route path='/signup' component={SignUp}/>
      <Route path='/' component={Home}/>
    </Switch>
  </Router>
);

export default App;
