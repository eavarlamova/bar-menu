import React, {
  memo,
  useState,
} from 'react';
import {
  useDispatch,
  useSelector,
} from 'react-redux';
import { isEmail, isStrongPassword } from 'validator';

import {
  Grid,
  Button,
  TextField,
  Typography,
} from '../../../../node_modules/@material-ui/core'

import { signUp as signUpAction } from '../../../stores/actions/users';

import Navbar from '../../components/Navbar';

import './index.scss';

const initialUserData = { email: '', password: '', name: '' };
const vallidateUserData = ({ email, password, name }) => ({
  name: name.trim(),
  email: email.trim(),
  password: password.trim(),
});


const SignUp = () => {
  const dispatch = useDispatch();
  const [error, setError] = useState(initialUserData);
  const [userData, setUserData] = useState(initialUserData);
  const { error: signUpGlobalError } = useSelector(state => state.users);

  const handleChange = ({ target: { value, name } }) => {
    setUserData({
      ...userData,
      [name]: value
    })
    setError(initialUserData);
  };


  const clickSignUp = () => {
    const { email } = userData;
    const emailValidate = isEmail(email);
    // add isStrongPassword for password in 'if' (if you want)
    const trimUserData = vallidateUserData(userData);
    const {
      name: trimUserName,
      password: trimUserPassword,
    } = trimUserData;
    if (emailValidate && trimUserPassword && trimUserName) {
      dispatch(signUpAction(trimUserData))
      setUserData(initialUserData);
      setError(initialUserData);
    }
    else {
      setError({
        name: trimUserName ? '' : 'uncorrect name',
        email: emailValidate ? '' : 'uncorrect email',
        password: trimUserPassword ? '' : 'uncorrect password',
      })
    }
  };


  return (
    <>
      <Navbar />
      <Grid
        container
        direction="column"
        alignItems="center"
        justifyContent="center"
        className='sign-up__form'
      >
        <Typography variant="h5">
          JOIN TO OUR PARTY
        </Typography>
        {
          [
            'email',
            'password',
            'name',
            'sign up'
          ].map((item, index, array) => (
            <Grid
              item
              xl={6}
              sm={8}
              xs={12}
              fullWidth
            >
              {
                index !== array.length - 1
                  ?
                  (
                    error[item] ?
                      <TextField
                        error
                        fullWidth
                        type={item}
                        label={item}
                        id={`${item}-input`}
                        value={userData[item]}
                        onChange={handleChange}
                        helperText={error[item]}
                      />
                      :
                      <TextField
                        fullWidth
                        type={item}
                        name={item}
                        label={item}
                        id={`${item}-input`}
                        onChange={handleChange}
                        value={userData[item]}
                      />
                  )
                  :
                  (
                    <>
                      <Button
                        fullWidth
                        onClick={clickSignUp}
                      >
                        {item}
                      </Button>
                      <Typography
                        color="error"
                        align='center'
                      >
                        {signUpGlobalError ? signUpGlobalError.msg : ''}
                      </Typography>
                    </>
                  )
              }
            </Grid>
          ))
        }
      </Grid>
    </>
  )
};

export default memo(SignUp);