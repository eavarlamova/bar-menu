import React, { 
  memo, 
  useEffect,
} from "react";
import { 
  useDispatch, 
  useSelector,
} from "react-redux";
import {
  Route,
  Switch,
  Redirect,
  BrowserRouter as Router,
} from "react-router-dom";

import Home from "./view/pages/Home";
import User from "./view/pages/User";
import SignIn from "./view/pages/SignIn";
import SignUp from "./view/pages/SignUp";
import Personal from "./view/pages/Personal";
import MenuDocument from "./view/pages/MenuDocument";

import { getJWT } from "./helpers/jwt";
import { checkJWT } from "./stores/actions/users";

const App = () => {
  const dispatch = useDispatch();
  const { isAuth } = useSelector((state) => state.users);

  useEffect(() => {
    const jwt = getJWT();
    if (jwt) {
      dispatch(checkJWT(jwt));
    }
  }, [dispatch]);

  const PrivateRouter = (props) =>
    isAuth ? <Route {...props} /> : <Redirect to="/signin" />;

  return (
    <Router>
      <Switch>
        <Route path="/" component={Home} exact />
        <Route component={User} path="/user/:id" exact />
        <Route component={MenuDocument} path="/menu/:id" exact />
        <PrivateRouter component={Personal} path={"/user/"} exact />
        {isAuth ? (
          <Redirect to="/user" />
        ) : (
          <Route path="/signin" component={SignIn} />
        )}
        {isAuth ? (
          <Redirect to="/user" />
        ) : (
          <Route path={"/signup"} component={SignUp} />
        )}
      </Switch>
    </Router>
  );
};

export default memo(App);
