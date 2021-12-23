import React, {
  memo,
  useState,
} from 'react';
import {
  useDispatch,
  useSelector,
} from 'react-redux';
import { Link } from 'react-router-dom';

import {
  Menu,
  Badge,
  AppBar,
  Button,
  Toolbar,
  MenuItem,
  IconButton,
  Typography,
} from '@material-ui/core';
import {
  Menu as MenuIcon,
  Person as PersonIcon,
  LocalBar as LocalBarIcon,
  MenuBook as MenuBookIcon,
  ExitToApp as ExitToAppIcon,
} from '@material-ui/icons';

import { getJWT } from '../../../helpers/jwt';
import { signOut } from '../../../stores/actions/users';

import QRCodeModal from '../QRCodeModal';
import ErrorNotification from '../ErrorNotification';
import EditModal from '../../pages/Personal/components/EditModal';

import './index.scss';


const Navbar = () => {
  const dispatch = useDispatch();
  const {
    isAuth,
    user: { id },
  } = useSelector(state => state.users);
  const users_ingredients = useSelector(state => state.users.user.users_ingredients);
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorElMobile, setAnchorElMobile] = useState(null);
  const openMenu = Boolean(anchorEl);
  const openMenuMobile = Boolean(anchorElMobile);

  const handleSignOut = () => {
    const jwt = getJWT();
    dispatch(signOut(jwt))
  };

  const handleClick = (event, target = 'full') => {
    if (target === 'full') { setAnchorEl(event.currentTarget) }
    else if (target === 'mobile') { setAnchorElMobile(event.currentTarget) }
  };
  const handleClose = (target) => {
    setAnchorEl(null);
    if (target === 'mobile') { setAnchorElMobile(null) };
  };

  const getAuthorizedButton = () => (
    [
      <Button
        onClick={handleClick}
        aria-controls="navbar__menu"
      >
        <IconButton >
          <Badge
            color="secondary"
            badgeContent={users_ingredients.length}
          >
            <PersonIcon />
            <LocalBarIcon />
          </Badge>
        </IconButton>
      </Button>,
      <Link to={`/menu/${id}`}>
        <Button>
          <MenuBookIcon />
        </Button>
      </Link>,
      <QRCodeModal />,
      <IconButton onClick={handleSignOut}>
        <ExitToAppIcon />
      </IconButton>,
    ]
  );

  const getAuthorizedButtonContent = () => (
    <div className="navbar__auth-button">
      {getAuthorizedButton().map(item => item)}
      <Menu
        open={openMenu}
        id='navbar__menu'
        anchorEl={anchorEl}
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
  );
  const getAuthorizedButtonContentForMobile = () => (
    <div className="navbar__auth-button-mobile">
      <MenuIcon
        aria-controls="navbar__mobile-menu"
        onClick={(event) => handleClick(event, 'mobile')}
      />
      <Menu
        open={openMenuMobile}
        id='navbar__mobile-menu'
        anchorEl={anchorElMobile}
        onClose={handleClose.bind(null, 'mobile')}
        className='navbar__auth-button-mobile-menu'
      >
        {getAuthorizedButton().map(item => (
          <MenuItem onClose={handleClose.bind(null, 'mobile')}>
            {item}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
  const getUnAuthorizedButtonContent = () => (
    <>
      <Link to='/signin'>
        <Button color="inherit">SignIn</Button>
      </Link>
      <Link to='/signup'>
        <Button color="inherit">SignUp</Button>
      </Link>
    </>
  );

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
              <>
                {getAuthorizedButtonContent()}
                {getAuthorizedButtonContentForMobile()}
              </>
              :
              getUnAuthorizedButtonContent()
            }

          </div>
        </Toolbar>
      </AppBar >

      <ErrorNotification />
    </>
  )
};


export default memo(Navbar);