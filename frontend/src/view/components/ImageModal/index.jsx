import {
  memo,
  useState,
} from "react";

import {
  Modal,
  Button,
  Tooltip,
} from "@material-ui/core";

import "./index.scss";


const ImageModal = (props) => {
  const {
    image,
    children,
  } = props;
  const [openModal, setOpenModal] = useState(false);

  const handleChangeModal = () => { image && setOpenModal(!openModal) };

  const getModalContent = () => {
    return (
      <div className='modal-for-image'>
        <img
          src={image}
          className='modal-for-image__image'
        />
        <Button
          color='primary'
          variant='contained'
          className='modal-for-image__close'
          onClick={handleChangeModal}
        >
          close image
        </Button>
      </div>
    )
  }
  return (
    <>
      <Tooltip
        onClick={handleChangeModal}
        title={image ? `open photo` : 'have no photo'}
      >
        {children}
      </Tooltip>

      <Modal
        open={openModal}
        onClose={handleChangeModal}
      >
        {getModalContent()}
      </Modal>
    </>
  );
};

export default memo(ImageModal);