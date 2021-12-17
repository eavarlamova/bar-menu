import React, {
  memo,
  useEffect,
} from "react";
import { useSelector } from "react-redux";

import { Snackbar } from "@material-ui/core";
import { Alert as AlertMui } from "@material-ui/lab";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <AlertMui elevation={6} ref={ref} variant="filled" {...props} />;
});


const ErrorNotification = () => {
  const {
    msg,
    status,
    hasError,
  } = useSelector(state => state.error);
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    hasError && setOpen(true);
  }, [hasError]);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  return (
    <>
      {hasError
        &&
        <Snackbar
          open={open}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          onClose={handleClose}
          autoHideDuration={6000}
        >
          <Alert
            severity="error"
            onClose={handleClose}
            sx={{ width: '100%' }}
          >
            {status}: {msg}
          </Alert>
        </Snackbar>
      }
    </>
  )
};

export default memo(ErrorNotification);