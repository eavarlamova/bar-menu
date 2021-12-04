import
React, {
  memo,
} from 'react';
import {
  useDispatch,
  useSelector
} from 'react-redux';
import { Link } from 'react-router-dom';

import {
  Badge,
  AppBar,
  Button,
  Toolbar,
  MenuItem,
  Typography,
  IconButton,
} from '@material-ui/core';
import {
  Person as PersonIcon,
  LocalBar as LocalBarIcon,
  ExitToApp as ExitToAppIcon,
} from '@material-ui/icons';


import { setJWT, getJWT } from '../../../helpers/jwt';
import { signOut } from '../../../stores/actions/users'
import './index.scss'


const Navbar = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector(state => state.users.isAuth);
  const users_ingredients = useSelector(state => state.users.user.users_ingredients);

  const handleSignOut = () => {
    const jwt = getJWT();
    dispatch(signOut(jwt))
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar className="navbar">
          <Link to='/'>
            <Typography variant="h6" >
              Bar_menu
            </Typography>
          </Link>
          <MenuItem>
            {isAuth
              ?
              <>
                <Link to='/user'>
                  <IconButton >
                    {/*in badgeContent will be ingredients in Availability*/}
                    <Badge badgeContent={users_ingredients.length} color="secondary">
                      <PersonIcon />
                      <LocalBarIcon />
                    </Badge>
                  </IconButton>
                </Link>
                <IconButton onClick={handleSignOut}>
                  <ExitToAppIcon />
                </IconButton>

                <Link to='/user/42'> KEK </Link>
              </>
              :
              (
                <>
                  <Link to='/signin'>
                    <Button color="inherit">SignIn</Button>
                  </Link>
                  <Link to='/signup'>
                    <Button color="inherit">SignUp</Button>
                  </Link>
                </>
              )
            }

          </MenuItem>
        </Toolbar>
      </AppBar >
    </>
  )
};


export default memo(Navbar);