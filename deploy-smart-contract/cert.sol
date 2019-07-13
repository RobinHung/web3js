pragma solidity ^0.4.25;

contract cert {
    string public rootCert;
    string public csrFile;
    string public serverCert;
    bool public isValid = false;
    
    constructor(string file) public {
        rootCert = file;
    }
    
    function uploadCSR(string file) public returns (bool) {
        csrFile = file;
        return true;
    }

    function uploadCert(string file) public returns (bool) {
        serverCert = file;
        isValid = true;
        return true;
    }
    
    function checkCertStatus() public view returns (string) {
        if (isValid == true) {
            return "Certificate is valid!";
        } else {
            return "Certificate is invalid!";
        }
    }
    
    function revokeCertificate() public returns (bool) {
        isValid = false;
        serverCert = "XXX";
        
        return true;
    }
}