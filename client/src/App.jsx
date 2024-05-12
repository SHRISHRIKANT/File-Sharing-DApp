import { useState, useEffect } from 'react';
import abi from "./contractJson/Files.json";
import { ethers } from "ethers";
import Memos from './components/Memos';
import logo from './logo.png';
import Buy from './components/Buy';
import './App.css';

function App() {
  const [state, setState] = useState({
    provider: null,
    signer: null,
    contract: null
  });
  const [account, setAccount] = useState('Not connected');
  const [filesSent, setFilesSent] = useState([]);
  const [filesReceived, setFilesReceived] = useState([]);

  useEffect(() => {
    const connectBlockchain = async () => {
      const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
      const contractABI = abi.abi;

      try {
        const { ethereum } = window;

        if (!ethereum) {
          console.log("Please install MetaMask to connect to the Ethereum network");
          return;
        }

        const chainId = await ethereum.request({ method: "eth_chainId" });

        if (chainId !== "0x7a69") {
          console.log("Please connect to the correct network (chainId: 31337)");
          return;
        }

        const accounts = await ethereum.request({ method: "eth_requestAccounts" });

        ethereum.on("accountsChanged", () => {
          window.location.reload();
        });
        
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(contractAddress, contractABI, signer);

        setAccount(accounts[0]);
        setState({ provider, signer, contract });
        fetchFiles();
      } catch (error) {
        console.log(error);
      }
    };
    connectBlockchain();
  }, []);

  const fetchFiles = async () => {
    if (state.contract) {
      try {
        const sentFiles = await state.contract.getSentFiles();
        const receivedFiles = await state.contract.getReceivedFiles();
        setFilesSent(sentFiles);
        setFilesReceived(receivedFiles);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const sendFile = async (_receiver, _url) => {
    try {
      await state.contract.sendFile(_receiver, _url);
      fetchFiles();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteSentFile = async (_index) => {
    try {
      await state.contract.deleteSentFile(_index);
      fetchFiles();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteReceivedFile = async (_index) => {
    try {
      await state.contract.deleteReceivedFile(_index);
      fetchFiles();
    } catch (error) {
      console.log(error);
    }
  };

  const markFileAsReceived = async (_index) => {
    try {
      await state.contract.markFileAsReceived(_index);
      fetchFiles();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <img src={logo} className="img-fluid" alt=".." width="25%" />
      <p style={{ marginTop: "10px", marginLeft: "5px", fontSize:"30px"}}>
        <small>Connected Account - {account}</small>
      </p>

      <Buy state={state} sendFile={sendFile} />
      <Memos
        filesSent={filesSent}
        filesReceived={filesReceived}
        deleteSentFile={deleteSentFile}
        deleteReceivedFile={deleteReceivedFile}
        markFileAsReceived={markFileAsReceived} // Pass the function as a prop
      />
    </div>
  );
}

export default App;
