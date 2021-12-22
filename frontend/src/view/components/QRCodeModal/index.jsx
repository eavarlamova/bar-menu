import React, {
  memo,
  useState,
} from "react";
import {
  useSelector,
} from 'react-redux';
import QRCode from 'qrcode.react';

import {
  Modal,
  Button,
  Tooltip,
} from '@material-ui/core';
import { Share } from '@material-ui/icons';

import { URL_FRONT } from '../../../mainConstants';

import './index.scss'


const QRCodeModal = (props) => {
  const { children } = props;
  const [openModal, setOpenModal] = useState(false);
  const { id } = useSelector(state => state.users.user);

  const handleChangeModal = () => { setOpenModal(!openModal) };

  const getQRCode = () => (
    <QRCode
      size={350}
      className='qr__image'
      value={children || `${URL_FRONT}/menu/${id}`}
    />
  );


  return (
    <>
      <Tooltip title='open QR-code for your menu'>
        <Button onClick={handleChangeModal}>
          <Share />
        </Button>
      </Tooltip>

      <Modal
        open={openModal}
        onClose={handleChangeModal}
      >
        <div className='qr__modal'>
          {getQRCode()}
        </div>
      </Modal>
    </>
  );
};


export default memo(QRCodeModal);