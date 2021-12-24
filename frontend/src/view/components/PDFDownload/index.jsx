import { memo } from "react";

import pdfMake from 'pdfmake';
import * as html2canvas from 'html2canvas';

import { Button } from "@material-ui/core"


const PDFDownload = (props) => {
  const {
    author,
    children,
  } = props;

  const getPdfMenu = async () => {
    const contentForPDF = { content: [] }
    let numberOfGettingContent = 1;

    while (numberOfGettingContent) {
      const currentElementOfMmenu = document.getElementById(`menu-for-pdf-${numberOfGettingContent}`)
      numberOfGettingContent = currentElementOfMmenu ? numberOfGettingContent + 1 : 0;
      if (numberOfGettingContent === 0) break;
      const canvas = await html2canvas(currentElementOfMmenu, {
        logging: true,
        useCORS: true,
        allowTaint: false,
        letterRendering: 1,
      });
      const imgData = canvas.toDataURL('image/png');

      contentForPDF.content.push({
        width: 500,
        image: imgData,
        margin: [0, 0, 0, 10]
      });
    }
    pdfMake.createPdf(contentForPDF).download(`${author}'s-menu.`)
  };

  return (
    <Button
      fullWidth
      color='primary'
      variant='contained'
      onClick={getPdfMenu}
    >
      {children}
    </Button>
  )
};

export default memo(PDFDownload);