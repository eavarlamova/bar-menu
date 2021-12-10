import { memo, useState } from "react";

import {
  Modal,
  Button,
  TextField,
} from '@material-ui/core';
import {
  HighlightOff as HighlightOffIcon
} from '@material-ui/icons';

import DropzoneFiles from "../../../components/DropzoneFiles";

import './index.scss';
import { useSelector } from "react-redux";


const EditModal = (props) => {
  const {
    children,
    closeMenu,
  } = props;
  const { user } = useSelector(state => state.users)
  const [openModal, setOpenModal] = useState(false);
  const [photo, setPhoto] = useState(null);
  const [currentUser, setCurrentUser] = useState(user || {})


  const handleChangeModal = (event) => {
    event.stopPropagation();
    setOpenModal(!openModal);
    if (openModal) closeMenu();
  };

  // check work
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
        id={`${item}-input`}
        onChange={handleChange}
        // onKeyDown={saveIngredient}
        label={item}
        type={item}
        name={item}
        value={currentUser[item]}
        fullWidth
        multiline
      />
    ))
  );
  return (
    <>
      <div onClick={handleChangeModal}>
        {children}
      </div>

      <Modal
        open={openModal}
        onClose={handleChangeModal}
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
          <Button>
            save change
          </Button>
        </div>
      </Modal>
    </>
  )
};

export default memo(EditModal);