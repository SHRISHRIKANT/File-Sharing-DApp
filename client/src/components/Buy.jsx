import { useState } from 'react';
import axios from 'axios';

function Buy({ state, sendFile }) {
  const [receiver, setReceiver] = useState('');
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState('No file selected');

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setFileName(selectedFile.name);
  };

  const handleSendFile = async () => {
    if (receiver && file) {
      try {
        const formData = new FormData();
        formData.append('file', file);

        const response = await axios.post('https://api.pinata.cloud/pinning/pinFileToIPFS', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            pinata_api_key: '7901d5b56f76e302d8f0',
            pinata_secret_api_key: 'e004ed8403e0ea96924550289787df45e7d4f024057aade000c66693671bbf3e',
          },
        });

        const ipfsHash = `ipfs://${response.data.IpfsHash}`;
        sendFile(receiver, ipfsHash);

        setReceiver('');
        setFile(null);
        setFileName('No file selected');
      } catch (error) {
        console.error('Error uploading file:', error);
      }
    } else {
      alert("Please enter receiver's address and select a file");
    }
  };

  return (
    <div>
      <h2><u>SEND FILE </u>:) </h2>
      <div className="form-group">
        <label htmlFor="receiver"><h3>RECEIVER'S ADDRESS : </h3></label>
        <input
          type="text"
          className="form-control"
          id="receiver"
          value={receiver}
          onChange={(e) => setReceiver(e.target.value)}
        />
      </div><br></br>
      <div className="form-group">
        <label htmlFor="file"><h3>SELECT THE FILE WHICH YOU WANT TO SEND BELOW</h3></label>
        <input
          type="file"
          className="form-control-file "
          id="file"
          onChange={handleFileChange}
        />
      </div>
      <p>{fileName}</p>
      <button className="btn btn-primary" onClick={handleSendFile}>
        Send File
      </button>
    </div>
  );
}

export default Buy;
