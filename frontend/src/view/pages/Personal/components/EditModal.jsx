import { memo, useState } from "react";

import {
  Modal,
  Button,
} from '@material-ui/core';

import './index.scss';


const EditModal = (props) => {
  const { 
    children,
    closeMenu,
   } = props;
  const [openModal, setOpenModal] = useState(false);

  const handleChangeModal = (event) => {
    event.stopPropagation();
    setOpenModal(!openModal);
    if(openModal)  closeMenu();         
  };

  console.log('openModal', openModal)

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
          fdfdff
          content
        </div>
      </Modal>
    </>
  )
};

export default memo(EditModal);