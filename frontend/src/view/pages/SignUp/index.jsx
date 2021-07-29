import React,
{
  useCallback,
  useEffect,
  useState
} from 'react';
import { useDispatch } from 'react-redux';

import {
  Grid,
  TextField,
} from '@material-ui/core'

import './index.scss'


const SignUp = () => {
  const dispatch = useDispatch();
  const [userData, setUserData] = useState({ email: '', password: '' });

  const handleChange = useCallback(({ target: { value, type } }) => {
    setUserData({
      ...userData,
      [type]: value
    })
  })



  return (
    <>
      <Grid
        className='sign-up__form'
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        {
          ['email', 'password'].map(item => (
            <Grid
              item
              xs={12}
              sm={8}
              xl={6}
              fullWidth
            >
              <TextField
                id={`${item}-input`}
                onChange={handleChange}
                label={item}
                type={item}
                fullWidth
              />
            </Grid>
          ))
        }
        {/* <Grid
          item
          xs={12}
          sm={8}
          xl={6}
        >
          <TextField
            id="email-input"
            label="email"
            type="email"
            fullWidth
          />
        </Grid>
        <Grid
          item
          xs={12}
          sm={8}
          xl={6}
        >
          <TextField
            id="password-input"
            label="password"
            type="password"
            fullWidth
          />
        </Grid> */}

      </Grid>


      SignUp Page
    </>
  )
};

export default SignUp;