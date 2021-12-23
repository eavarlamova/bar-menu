import
React, {
  memo,
  useState,
} from 'react';
import {
  useSelector,
  useDispatch,
} from 'react-redux';
import { isEmail, isStrongPassword } from 'validator';

import {
  Grid,
  Button,
  TextField,
  Typography,
} from '@material-ui/core';

import { signIn as signInAction } from '../../../stores/actions/users';

import Navbar from "../../components/Navbar";

const initialUserData = { email: '', password: '' };
const vallidateUserData = ({ email, password }) => ({
  email: email.trim(),
  password: password.trim(),
});


const SignIn = () => {
  const dispatch = useDispatch();
  const [error, setError] = useState(initialUserData);
  const [userData, setUserData] = useState(initialUserData);
  const { error: signInGlobalError } = useSelector(state => state.users);

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
    // you can add inStrongPassword in if (if you want to suffer)
    const trimUserData = vallidateUserData(userData);
    const {
      password: trimUserPassword,
    } = trimUserData;
    if (emailValidate && trimUserPassword) {
      dispatch(signInAction(trimUserData))
      setUserData(initialUserData);
      setError(initialUserData);
    }
    else {
      setError({
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
          GO ON OUR PARTY
        </Typography>
        {
          [
            'email',
            'password',
            'sign in'
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
                        {signInGlobalError ? signInGlobalError.msg : ''}
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

export default memo(SignIn);