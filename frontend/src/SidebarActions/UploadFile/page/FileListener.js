import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { STORAGE_KEY } from '../../../api/variables';

function FileWatcher() {
  const [folderPath, setFolderPath] = useState('');
  const [responseMessage, setResponseMessage] = useState('');
  const [files, setFiles] = useState([]); // Store the list of modified or added files
  const config = {headers:{ Authorization: "Bearer " + localStorage.getItem(STORAGE_KEY),}}

  
  const handleChange = (e) => {
    setFolderPath(e.target.value);
  };

  const handleSetFolder = async () => {
    try {
      const response = await axios.post('http://localhost:5000/filesystem/set-folder', {folderPath},config);
      setResponseMessage(response.data);
    } catch (error) {
      console.error('Error setting folder:', error);
    }
  };

  // Function to fetch the list of files from the server
  useEffect(() => {
  const fetchFiles = async () => {
    try {
      const response = await axios.get('http://localhost:5000/filesystem/files',config);
      setFiles(response.data);
    } catch (error) {
      console.error('Error fetching files:', error);
    }
  };
// Poll for changes every 5 seconds (adjust as needed)
const pollInterval = setInterval(() => {
    fetchFiles(); // Fetch files periodically
  }, 1000);

  // Clean up the interval when the component unmounts
  return () => {
    clearInterval(pollInterval);
  };
}, []); // Empty dependency array to run only on mount

  return (
    <div className="FileWatcher">
      <h1>Log File Listener:</h1>
      <div>
        <label >Enter the folder/file path to listen:</label>
        <input type="text" onChange={handleChange} />
        <button onClick={handleSetFolder}>Set local Folder</button>
      </div>
      <div>
        <p>{responseMessage}</p>
      </div>
      <div className='addedfiles'>
        <h2>Modified or Added Files:</h2>
        <ul>
          {files.map((file, index) => (
            <li key={index}>{file}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default FileWatcher;