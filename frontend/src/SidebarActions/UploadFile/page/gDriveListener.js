import React, { useState } from 'react';
import axios from 'axios';
import { STORAGE_KEY } from '../../../api/variables';

const FolderWatcher = () => {
  const [folderLink, setFolderLink] = useState('');
  const [message, setMessage] = useState('');
  const config = {headers:{ Authorization: "Bearer " + localStorage.getItem(STORAGE_KEY),}}


  const handleInputChange = (e) => {
    setFolderLink(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send the folder link to your backend
      await axios.post('http://localhost:5000/filesystem/set-drive-folder', { folderLink },config);
      setMessage(`Folder link sent to the backend watcher: ${folderLink}`);
    } catch (error) {
      setMessage('Error sending folder link to the backend.');
      console.error(error);
    }
  };
  
  return (
    <div>
      <h2 className='gdrive'>Google Drive Folder Watcher</h2>
      <form onSubmit={handleSubmit}>
        <div className='gd'>
          <label>Folder Link:</label>
          <input
            type="text"
            value={folderLink}
            onChange={handleInputChange}
            placeholder="Enter Google Drive folder link"
            required
          />
                  <button type="submit">Set drive folder</button>
        </div>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default FolderWatcher;