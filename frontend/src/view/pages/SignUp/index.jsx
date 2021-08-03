import React,
{
  memo,
  useState,
  useCallback,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isEmail, isStrongPassword } from 'validator';

import {
  Grid,
  Button,
  TextField,
  Typography,
} from '../../../../node_modules/@material-ui/core'

import { signUp as signUpAction } from '../../../stores/actions/users';

import './index.scss'

const initialUserData = { email: '', password: '', name: '' };
const vallidateUserData = ({ email, password, name }) => ({
  email: email.trim(),
  password: password.trim(),
  name: name.trim(),
});


const SignUp = () => {
  const dispatch = useDispatch();
  const [userData, setUserData] = useState(initialUserData);
  const [error, setError] = useState(initialUserData);
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
    // add isStrongPassword for password in 'if'
    const trimUserData = vallidateUserData(userData);
    const {
      password: trimUserPassword,
      name: trimUserName,
    } = trimUserData;
    if (emailValidate && trimUserPassword && trimUserName) {
      dispatch(signUpAction(trimUserData))
      setUserData(initialUserData);
      setError(initialUserData);
    }
    else {
      setError({
        email: emailValidate ? '' : 'uncorrect email',
        password: trimUserPassword ? '' : 'uncorrect password',
        name: trimUserName ? '' : 'uncorrect name',
      })
    }
  };


  return (
    <>
      <Grid
        className='sign-up__form'
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        <Typography variant="h5">
          JOIN TO OUR PARTY
        </Typography>
        {
          ['email', 'password', 'name', 'sign up'].map((item, index, array) => (
            <Grid
              item
              xs={12}
              sm={8}
              xl={6}
              fullWidth
            >
              {
                index !== array.length - 1
                  ?
                  (
                    error[item] ?
                      <TextField
                        error
                        helperText={error[item]}
                        id={`${item}-input`}
                        onChange={handleChange}
                        label={item}
                        type={item}
                        value={userData[item]}
                        fullWidth
                      />
                      :
                      <TextField
                        id={`${item}-input`}
                        onChange={handleChange}
                        label={item}
                        type={item}
                        name={item}
                        value={userData[item]}
                        fullWidth
                      />
                  )
                  :
                  (
                    <>
                      <Button
                        onClick={clickSignUp}
                        fullWidth
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