import { useState } from "react";
import "./Memos.css";

const Memos = ({ filesSent, filesReceived, deleteSentFile, deleteReceivedFile, markFileAsReceived }) => {
  const getImages = (files, isSent) => {
    return files.map((file, index) => (
      <li key={index}>
        {Array.isArray(file.url) ? (
          file.url.map((url, idx) => (
            <div key={idx}>
              <a href={url} target="_blank" rel="noreferrer">
                <img src={`https://gateway.pinata.cloud/ipfs/${url.substring(7)}`} alt={`Image ${index + 1}`} style={{ width: "200px", height: "auto" }} />
              </a>
              {file.receiver && <p>Receiver: {file.receiver}</p>}
              {file.sender && <p>Sender: {file.sender}</p>}
              {isSent ? (
                <button onClick={() => deleteSentFile && deleteSentFile(index)}>Delete</button>
              ) : (
                <button onClick={() => deleteReceivedFile && deleteReceivedFile(index)}>Delete</button>
              )}
              {!file.received && !isSent && (
                <button onClick={() => markFileAsReceived && markFileAsReceived(index)}>Mark as Received</button>
              )}
              <hr />
            </div>
          ))
        ) : (
          <div>
            <a href={file.url} target="_blank" rel="noreferrer">
              <img src={`https://gateway.pinata.cloud/ipfs/${file.url.substring(7)}`} alt={`Image ${index + 1}`} style={{ width: "200px", height: "auto" }} />
            </a>
            {file.receiver && <p>Receiver: {file.receiver}</p>}
            {file.sender && <p>Sender: {file.sender}</p>}
            {isSent ? (
              <button onClick={() => deleteSentFile && deleteSentFile(index)}>Delete</button>
            ) : (
              <button onClick={() => deleteReceivedFile && deleteReceivedFile(index)}>Delete</button>
            )}
            {!file.received && !isSent && (
              <button onClick={() => markFileAsReceived && markFileAsReceived(index)}>Mark as Received</button>
            )}
            <hr />
          </div>
        )}
      </li>
    ));
  };

  return (
    <div className="Memos">
      <h2>Sent Files</h2>
      <ul>
        {filesSent.length > 0 ? (
          getImages(filesSent, true)
        ) : (
          <li>No files sent</li>
        )}
      </ul>
      <h2>Received Files</h2>
      <ul>
        {filesReceived.length > 0 ? (
          getImages(filesReceived, false)
        ) : (
          <li>No files received</li>
        )}
      </ul>
    </div>
  );
};

export default Memos;
