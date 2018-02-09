pragma solidity ^0.4.0;


contract Hash {

    uint private a = 777111666111777;

    string private b = 'CrYppT0GaIIIeV0o0-';

    bytes32 private base = sha256(keccak256(a, b), now);

    function get() public returns (bytes32) {
        base = sha256(base, a, b);
        return base;
    }

}

//0xb2ca81eEA4b3CaC223394A14EC8f01B6F9e490b5