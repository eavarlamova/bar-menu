import React, {
  memo,
  useState,
} from "react";
import {
  useDispatch,
  useSelector,
} from "react-redux";

import {
  Modal,
  Button,
  TextField,
} from '@material-ui/core';
import {
  HighlightOff as HighlightOffIcon
} from '@material-ui/icons';

import isEmail from "validator/lib/isEmail";
import DropzoneFiles from "../../../components/DropzoneFiles";
import { editUserInfo } from "../../../../stores/actions/users"

import './index.scss';


const EditModal = (props) => {
  const dispatch = useDispatch();
  const {
    children,
    closeMenu,
  } = props;
  const { user } = useSelector(state => state.users)
  const [photo, setPhoto] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [currentUser, setCurrentUser] = useState(user || {})
  const [error, setError] = useState({ name: null, email: null });


  const handleChangeModal = (event) => {
    event.stopPropagation();
    setOpenModal(!openModal);
    if (openModal) closeMenu();
  };

  const handleChange = ({ target }) => {
    setCurrentUser({
      ...currentUser,
      [target.name]: target.value
    })
  };

  const getInputContent = () => (
    [
      'name',
      'email',
    ].map(item => (
      <TextField
        fullWidth
        multiline
        type={item}
        name={item}
        id={`${item}-input`}
        onChange={handleChange}
        value={currentUser[item]}
        error={Boolean(error[item])}
        label={error[item] ? error[item] : item}
        onKeyDown={(event) => { event.key === 'Enter' && saveChange() }}
      />
    ))
  );

  const checkError = () => {
    const { name, email } = currentUser;
    if (!name.trim()) {
      setError({
        ...error,
        name: 'name is not correct',
        email: null,
      })
      return true;
    }
    if (!isEmail(email)) {
      setError({
        ...error,
        email: 'email is not correct',
        name: null,
      })
      return true;
    };
  };


  const saveChange = () => {
    if (checkError()) return;

    dispatch(editUserInfo({
      photo,
      currentUser,
    }));
    setOpenModal(false);
    closeMenu();
  };


  return (
    <>
      <div onClick={handleChangeModal}>
        {children}
      </div>

      <Modal
        open={openModal}
        onClose={handleChangeModal}
        onClick={event => event.stopPropagation()}
      >
        <div className="modal">
          <div className="modal__header">
            <h3> EDIT YOUR PROFILE </h3>
            <div
              onClick={handleChangeModal}
            >
              <HighlightOffIcon />
            </div>
          </div>
          {getInputContent()}
          <DropzoneFiles setFile={setPhoto} />
          <Button onClick={saveChange}>
            save change
          </Button>
        </div>
      </Modal>
    </>
  )
};

export default memo(EditModal);