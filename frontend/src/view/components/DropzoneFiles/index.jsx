import React, {
  memo,
  useEffect,
} from 'react';
import { useDropzone } from 'react-dropzone';

import './index.scss';


const DropzoneFiles = ({ setFile }) => {
  const {
    acceptedFiles,
    fileRejections,
    getRootProps,
    getInputProps
  } = useDropzone({
    accept: 'image/jpeg, image/png',
    maxFiles: 1
  });

  useEffect(() => {
    setFile(acceptedFiles[0])
  }, [acceptedFiles]);

  const acceptedFileItems = acceptedFiles.map(file => (
    <li
      key={file.path}
      className='dropzone__file'
    >
      {file.path} - {file.size} bytes
    </li>
  ));

  const fileRejectionItems = fileRejections.map(({ file, errors }) => (
    <li
      key={file.path}
      className='dropzone__file'
    >
      {file.path} - {file.size} bytes
      <ul>
        {errors.map(error => (
          <li key={error.code}>{error.message}</li>
        ))}
      </ul>
    </li>
  ));

  return (
    <section className="dropzone">
      <div {...getRootProps({ className: 'dropzone__download' })} >
        <input
          {...getInputProps()}
        />
        <p className='dropzone__title'>
          Drag 'n' drop some files here, or click to select files
          <hr />
          Only 1 file in *.jpeg and *.png images will be accepted
        </p>
      </div>
      {
        acceptedFileItems.length || fileRejectionItems.length
          ?
          <aside>
            <h4>Accepted files</h4>
            <ul>{acceptedFileItems}</ul>
            <h4>Rejected files</h4>
            <ul>{fileRejectionItems}</ul>
          </aside>
          :
          ''
      }
    </section>
  );
};

export default memo(DropzoneFiles);