pragma solidity ^0.4.25;

contract cert {
    string public rootCert;
    string public csrFile;
    bool public isRevoke = false;   // false: valid certificate
    
    constructor(string file) public {
        rootCert = file;
    }
    
    function uploadCSR(string file) public returns (bool) {
        csrFile = file;
        return true;
    }
    
    function checkCertStatus() public view returns (string) {
        if (isRevoke == false) {
            return "Certificate is valid!";
        } else {
            return "Certificate has been revoked! :(";
        }
    }
    
    function revokeCertificate() public returns (bool) {
        isRevoke = true;    // no longer valid!
        rootCert = "XXX";
        
        return true;
    }
}