pragma solidity ^0.4.0;


contract Hash {

    uint private a = 7771116661117277;

    string private b = 'CrYppT0ddsGaIIIeV0o0-';

    bytes32 private base = sha256(keccak256(a, b), now);

    function get() public returns (bytes32) {
        base = sha256(base, a, b);
        return base;
    }

}

//0x5d6beb7e4c3f471c3f12e5d613c43d7c35a76a1f

/*[
{
"constant": false,
"inputs": [],
"name": "get",
"outputs": [
{
"name": "",
"type": "bytes32"
}
],
"payable": false,
"stateMutability": "nonpayable",
"type": "function"
}
]*/



/*compiler:
version: 0.4.21+commit.dfe3193c*/
