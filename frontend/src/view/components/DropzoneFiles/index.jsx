import React, { memo, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { useSelector } from 'react-redux';

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
// set file 
setFile(acceptedFiles[0])
    }, [acceptedFiles])


    const acceptedFileItems = acceptedFiles.map(file => (
        <li key={file.path} className='dropzone__file'>
            {file.path} - {file.size} bytes
        </li>
    ));

    const fileRejectionItems = fileRejections.map(({ file, errors }) => (
        <li key={file.path} className='dropzone__file'>
            {file.path} - {file.size} bytes
            <ul>
                {errors.map(e => (
                    <li key={e.code}>{e.message}</li>
                ))}
            </ul>
        </li>
    ));

    return (
        <section className="dropzone">
            <div {...getRootProps({ className: 'dropzone' })} >
                <input 
                {...getInputProps()}
                />
                <p>Drag 'n' drop some files here, or click to select files</p>
                <em>(Only 1 file will be accepted)</em>
                <em>(Only *.jpeg and *.png images will be accepted)</em>
            </div>
            <aside>
                <h4>Accepted files</h4>
                <ul>{acceptedFileItems}</ul>
                <h4>Rejected files</h4>
                <ul>{fileRejectionItems}</ul>
            </aside>
        </section>
    );
}

export default memo(DropzoneFiles);