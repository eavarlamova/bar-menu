import
React, {
  memo, 
  useState,
  useEffect,
} from 'react';
import { 
  useSelector,
  useDispatch, 
 } from 'react-redux';
import { 
  Grid,
  Button,
  TextField,
  Typography,
} from '@material-ui/core';
import { isEmail, isStrongPassword } from 'validator';

import Navbar from "../../components/Navbar";
import { redirectWithAuth } from '../../../helpers/redirect';
import { signIn as signInAction } from '../../../stores/actions/users';

const initialUserData = { email: '', password: '' };
const vallidateUserData = ({ email, password }) => ({
  email: email.trim(),
  password: password.trim(),
});

const SignIn = () => {
  const dispatch = useDispatch();
  const { isAuth } = useSelector(state => state.users)
  const [userData, setUserData] = useState(initialUserData);
  const [error, setError] = useState(initialUserData);
  const { error: signInGlobalError } = useSelector(state => state.users);

  useEffect(() => {
    redirectWithAuth(isAuth)
  }, [isAuth])

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
        className='sign-up__form'
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        <Typography variant="h5">
          GO ON OUR PARTY
        </Typography>
        {
          ['email', 'password', 'sign in'].map((item, index, array) => (
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