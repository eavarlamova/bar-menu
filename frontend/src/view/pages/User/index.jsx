import React, {
  memo,
  useState,
  useEffect,
} from "react";
import {
  useDispatch,
  useSelector,
} from "react-redux";
import {
  Link,
  Redirect,
} from "react-router-dom";

import {
  Button,
  Typography,
} from "@material-ui/core";

import { getUserInformation } from "../../../stores/actions/users";

import Navbar from "../../components/Navbar";
import ProductsList from "../../components/ProductsList";

import './index.scss';


const User = (props) => {
  const dispatch = useDispatch();
  const { match: { params: { id: idFromURL } } } = props;
  const {
    isAuth,
    user: { id: idOfCurrentUser }
  } = useSelector(state => state.users);
  const { error } = useSelector(state => state.users);
  const { selectedUserData } = useSelector(state => state.users);
  const [needRedirect, setNeedRedirect] = useState(false);

  useEffect(() => {
    if (Number(idOfCurrentUser) === Number(idFromURL) && isAuth) {
      setNeedRedirect(true);
    }
    else {
      dispatch(getUserInformation(idFromURL))
    }
  }, [idFromURL, idOfCurrentUser])


  if (needRedirect) return <Redirect to='/user' />
  return (
    <>
      <Navbar />
      <div className="user">
        {selectedUserData && selectedUserData.name ?
          <>
            <div className="user__welcome-text">
              <Typography variant='h5'>
                It`s the <b>{selectedUserData.name}</b>`s page
              </Typography>
              <Typography variant='body1'>
                you can write on email - <b>{selectedUserData.email}</b>
              </Typography>
              {selectedUserData.products.length
                ?
                <>
                  <Link to={`/menu/${selectedUserData.id}`}>
                    <Button
                      color='primary'
                      variant='outlined'
                    >
                      look {selectedUserData.name}`s menu
                    </Button>
                  </Link>
                </>
                :
                ''
              }
            </div>
            <div className="user__products-list">
              <ProductsList products={selectedUserData.products} target='user' />
            </div>
          </>
          :
          <Typography
            color='error'
            align='center'
          >
            oops... {error ? error.msg : 'user not found'}
          </Typography>
        }
      </div>
    </>
  )
};

export default memo(User);