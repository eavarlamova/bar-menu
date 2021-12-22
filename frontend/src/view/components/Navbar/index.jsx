import
React, {
  memo, useState,
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
  Menu,
} from '@material-ui/core';
import {
  Person as PersonIcon,
  LocalBar as LocalBarIcon,
  MenuBook as MenuBookIcon,
  ExitToApp as ExitToAppIcon,
} from '@material-ui/icons';



import ErrorNotification from '../ErrorNotification';
import { setJWT, getJWT } from '../../../helpers/jwt';
import { signOut } from '../../../stores/actions/users';
import EditModal from '../../pages/Personal/components/EditModal';

import './index.scss';


const Navbar = () => {
  const dispatch = useDispatch();
  const {
    isAuth,
    user: { id },
  } = useSelector(state => state.users);
  const users_ingredients = useSelector(state => state.users.user.users_ingredients);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const openMenu = Boolean(anchorEl);

  const handleSignOut = () => {
    const jwt = getJWT();
    dispatch(signOut(jwt))
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
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
          <div>
            {isAuth
              ?
              <div>
                <Button
                  onClick={handleClick}
                  aria-controls="navbar__menu"
                >
                  <IconButton >
                    {/*in badgeContent will be ingredients in Availability*/}
                    <Badge badgeContent={users_ingredients.length} color="secondary">
                      <PersonIcon />
                      <LocalBarIcon />
                    </Badge>
                  </IconButton>
                </Button>
                <Link to={`/menu/${id}`}>
                  <Button>
                    <MenuBookIcon />
                  </Button>
                </Link>
                <IconButton onClick={handleSignOut}>
                  <ExitToAppIcon />
                </IconButton>


                <Menu
                  id='navbar__menu'
                  anchorEl={anchorEl}
                  open={openMenu}
                  onClose={handleClose}
                >
                  {[
                    <Link to='/user'>open profile</Link>,
                    <EditModal closeMenu={handleClose}>edit profile</EditModal>,
                  ].map(item =>
                    <MenuItem onClick={handleClose}> {item} </MenuItem>
                  )}
                </Menu>

              </div>
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

          </div>
        </Toolbar>
      </AppBar >

      <ErrorNotification />
    </>
  )
};


export default memo(Navbar);