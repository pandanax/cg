let abi = [
  {
    "constant": true,
    "inputs": [],
    "name": "currentPeriod",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "ticketPrice",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "jackPotFunds",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "jackPotPercents",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "benefitPercents",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [],
    "name": "benefit",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [],
    "name": "finishRoundAndStartNew",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "benefitFunds",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "jackPotBestHash",
    "outputs": [
      {
        "name": "",
        "type": "bytes32"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "owner",
    "outputs": [
      {
        "name": "",
        "type": "address"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "periodNumber",
        "type": "uint256"
      },
      {
        "name": "data",
        "type": "string"
      }
    ],
    "name": "buyTicket",
    "outputs": [],
    "payable": true,
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "maxTicketAmount",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "",
        "type": "uint256"
      },
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "tickets",
    "outputs": [
      {
        "name": "number",
        "type": "uint256"
      },
      {
        "name": "addr",
        "type": "address"
      },
      {
        "name": "hash",
        "type": "bytes32"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "maxPeriodDuration",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "periods",
    "outputs": [
      {
        "name": "number",
        "type": "uint256"
      },
      {
        "name": "startDate",
        "type": "uint256"
      },
      {
        "name": "winnerHash",
        "type": "bytes32"
      },
      {
        "name": "winnerAddress",
        "type": "address"
      },
      {
        "name": "raised",
        "type": "uint256"
      },
      {
        "name": "ticketAmount",
        "type": "uint256"
      },
      {
        "name": "finished",
        "type": "bool"
      },
      {
        "name": "reward",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "newOwner",
        "type": "address"
      }
    ],
    "name": "transferOwnership",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "name": "_maxPeriodDuration",
        "type": "uint256"
      },
      {
        "name": "_ticketPrice",
        "type": "uint256"
      },
      {
        "name": "_benefitPercents",
        "type": "uint256"
      },
      {
        "name": "_maxTicketAmount",
        "type": "uint256"
      },
      {
        "name": "_hashAddr",
        "type": "address"
      },
      {
        "name": "_jackPotPercents",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "payable": true,
    "stateMutability": "payable",
    "type": "fallback"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "name": "periodNumber",
        "type": "uint256"
      },
      {
        "indexed": true,
        "name": "from",
        "type": "address"
      },
      {
        "indexed": false,
        "name": "hash",
        "type": "bytes32"
      },
      {
        "indexed": false,
        "name": "when",
        "type": "uint256"
      }
    ],
    "name": "TicketSelling",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "name": "periodNumber",
        "type": "uint256"
      },
      {
        "indexed": true,
        "name": "winnerAddr",
        "type": "address"
      },
      {
        "indexed": false,
        "name": "reward",
        "type": "uint256"
      },
      {
        "indexed": false,
        "name": "winnerHash",
        "type": "bytes32"
      },
      {
        "indexed": false,
        "name": "when",
        "type": "uint256"
      }
    ],
    "name": "PeriodFinished",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "name": "to",
        "type": "address"
      },
      {
        "indexed": false,
        "name": "value",
        "type": "uint256"
      }
    ],
    "name": "TransferBenefit",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "name": "periodNumber",
        "type": "uint256"
      },
      {
        "indexed": false,
        "name": "winnerAddr",
        "type": "address"
      },
      {
        "indexed": false,
        "name": "winnerHash",
        "type": "bytes32"
      },
      {
        "indexed": false,
        "name": "value",
        "type": "uint256"
      },
      {
        "indexed": false,
        "name": "when",
        "type": "uint256"
      }
    ],
    "name": "JackPot",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "name": "previousOwner",
        "type": "address"
      },
      {
        "indexed": true,
        "name": "newOwner",
        "type": "address"
      }
    ],
    "name": "OwnershipTransferred",
    "type": "event"
  }
]


export default {
  key: '199YVXGQ54J8V7SXV1AQJPM4ETB8BMAVDX',
  contracts: {
    1: {
      sort: 0, address: '0x5520148407fe16c273e67a4c32173d08350103f4', abi: abi
    }
    /*2: '0xecd5f600fae1f202b60a04b52213225d0671253c',
     3: '0x103da18857d02861b008e56b0513d08b8752af6d',
     4: '0x82496f48e2e9695a74faca191566b0eb2611ffb1'*/
  }/*,
   abiUrl(gameId) {
   return 'solidity/build/contracts/Lotery.json'
   }*/
}
