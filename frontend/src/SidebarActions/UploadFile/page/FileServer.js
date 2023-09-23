import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import {
  FaFileImage,
  FaFilePdf,
  FaFileWord,
  FaFileAlt,
  FaFile,
} from "react-icons/fa";
import "../style/style.css";
import { STORAGE_KEY } from "../../../api/variables";

const fileTypeIcons = {
  jpg: <FaFileImage />,
  jpeg: <FaFileImage />,
  png: <FaFileImage />,
  pdf: <FaFilePdf />,
  doc: <FaFileWord />,
  docx: <FaFileWord />,
  txt: <FaFileAlt />,
  default: <FaFile />,
};

function printValue(folder) {
  console.log(folder);
}

function FileServer() {
  const [status, setStatus] = useState("");
  const [files, setFiles] = useState([]);

  const onDrop = useCallback((acceptedFiles) => {
    // Store the selected files in state
    setFiles(acceptedFiles);
  }, []);

  const handleUpload = () => {
    if (files.length === 0) {
      setStatus("No files selected");
      return;
    }

    // Create a new FormData object
    const formData = new FormData();

    // Append each selected file to the FormData object
    files.forEach((file) => {
      formData.append("files", file);
    });
    console.log(localStorage.getItem(STORAGE_KEY))
    // Send the FormData object to the server
    fetch("http://localhost:5000/filesystem/logs", {
      method: "POST",
      body: formData,
      headers: {
        Authorization: "Bearer " + localStorage.getItem(STORAGE_KEY),
      },
    })
      .then((response) => response.json()) // Define 'response' here
      .then((responseData) => {
        setStatus(responseData.message); // Use 'responseData' instead of 'response'
        setFiles([]);
      })
      .catch((error) => {
        console.error(error);
        setStatus("File upload failed");
      });
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "text/plain", // Accept only .txt files
  });

  return (
    <div className="FileServer">
      <h1>Upload to server:</h1>
      <div {...getRootProps()} className="dropzone">
        <input {...getInputProps()} />

        <div className="file-icons">
          {files.map((file, index) => (
            <div key={index}>
              {fileTypeIcons[file.name.split(".").pop()] ||
                fileTypeIcons.default}
              {file.name}
            </div>
          ))}
        </div>
      </div>
      <button onClick={handleUpload}>Upload</button>
      {status && <h4>{status}</h4>}
      
    </div>
  );
}

export default FileServer;
