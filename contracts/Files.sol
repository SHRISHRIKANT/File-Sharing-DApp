// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;



contract Files {
  
    struct File {
        string url;
        address sender;
        address receiver;
    }

    mapping(address => File[]) filesSent;
    mapping(address => File[]) filesReceived;

    event FileSent(address indexed sender, address indexed receiver, string url);
    event FileReceived(address indexed sender, address indexed receiver, string url);

    function sendFile(address _receiver, string memory _url) external {
        filesSent[msg.sender].push(File(_url, msg.sender, _receiver));
        filesReceived[_receiver].push(File(_url, msg.sender, _receiver));
        emit FileSent(msg.sender, _receiver, _url);
    }

    function getSentFiles() external view returns (File[] memory){
        return filesSent[msg.sender];
    }

    function getReceivedFiles() external view returns (File[] memory) {
        return filesReceived[msg.sender];
    }

    function deleteSentFile(uint256 _index) external {
        require(_index < filesSent[msg.sender].length, "Invalid index");
        delete filesSent[msg.sender][_index];
    }

    function deleteReceivedFile(uint256 _index) external {
        require(_index < filesReceived[msg.sender].length, "Invalid index");
        delete filesReceived[msg.sender][_index];
    }
}
