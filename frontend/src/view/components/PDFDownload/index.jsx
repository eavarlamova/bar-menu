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
        letterRendering: 1,
        allowTaint: false,
        useCORS: true,
      });
      const imgData = canvas.toDataURL('image/png');

      contentForPDF.content.push({
        image: imgData,
        width: 500,
        margin: [0, 0, 0, 10]
      });

    }
    pdfMake.createPdf(contentForPDF).download(`${author}'s-menu.`)
  }

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