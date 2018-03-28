pragma solidity ^0.4.0;

contract Genesis {

  event registrationEvent(address addr, address parent);

  event dieEvent(address whoDied, address whoReplaced);

  event getFundsEvent(address addr, uint256 amount);

  mapping (address => address[]) public children;

  mapping (address => address) public parents;

  mapping (address => uint256) public funds;

  mapping (address => string) public nicknames;

  mapping (address => uint256) public lastActivity;

  uint256 public capital; //all enters

  uint256 public customers; //count of customers

  uint256 public constant deadLine = 50 days; //bring him child

  address public genesis; //first element in genesis net

  modifier onlyGenesis() {
    require(msg.sender == genesis);
    _;
  }

  modifier withFunds() {
    //funds for me?
    require(funds[msg.sender] > 0);
    _;
  }





  //create first element
  function Genesis(address firstChild) {

    require(msg.sender != firstChild);
    genesis = msg.sender;
    nicknames[genesis] = 'Genesis';
    parents[genesis] = 0x0;
    customers++;
    registerAdmin(firstChild, 'First');

  }


  function isNotRegistered(address addr) constant  public returns (bool){
    if (parents[addr] == 0x0 && children[addr].length == 0) return true;
    return false;
  }

  function currentPayment() public constant returns (uint payment){

    if (capital > 1000 ether) {
      return 2 ether;
    }
    else
    if (capital > 200 ether) {
      return 1.33 ether;
    }
    else
    if (capital > 30 ether) {
      return 0.66 ether;
    }
    else
    if (capital > 4 ether) {
      return 0.33 ether;
    }
    else
    if (capital > 0.5 ether) {
      return 0.17 ether;
    }
    else
    if (capital > 0.1 ether) {
      return 0.05 ether;
    }
    return 0.01 ether;

  }


  function registerAdmin(address admin, string name) onlyGenesis public {
    require(isNotRegistered(admin));
    nicknames[admin] = name;
    parents[admin] = msg.sender;
    lastActivity[genesis] = now;
    children[genesis].push(admin);
    customers++;
    lastActivity[admin] = now;
  }

  function registerUser(address child, address parent, string nickname, uint value) private {
    //parent is member (and is not genesis)
    require(isNotRegistered(child));

    nicknames[child] = nickname;

    parents[child] = parent;

    children[parent].push(child);

    funds[parent] += value;

    capital += value;

    customers++;

    registrationEvent(child, parent);

    lastActivity[child] = now;
  }

  //user registration
  function registration(address parent, string nickname) payable public {

    //payment is equal
    require(msg.value == currentPayment());

    registerUser(msg.sender, parent, nickname, msg.value);


  }

  //every user
  function getMine() public withFunds {

    require(!isNotRegistered(msg.sender));
    //is not genesis
    require(msg.sender != genesis);


    //for me
    uint256 mine = funds[msg.sender] / 2;

    funds[parents[msg.sender]] += (funds[msg.sender] - mine);
    funds[msg.sender] = 0;

    msg.sender.transfer(mine);

    getFundsEvent(msg.sender, mine);

    lastActivity[msg.sender] = now;

  }

  function myAvailableFunds() public constant returns (uint256 myFunds) {
    return funds[msg.sender] / 2;
  }


  function getMineGenesis() public onlyGenesis withFunds {


    //for me
    uint256 mine = funds[msg.sender];

    funds[msg.sender] = 0;

    msg.sender.transfer(mine);

    getFundsEvent(msg.sender, mine);

    lastActivity[msg.sender] = now;

  }

  function transferGenesis(address newGen) public onlyGenesis {

    //new genesis is not member
    require(isNotRegistered(newGen));

    for (uint i = 0; i < children[genesis].length; i++) {

      children[newGen].push(children[genesis][i]);
      parents[children[genesis][i]] = newGen;
      children[genesis][i] = 0x0;

    }

    children[genesis].length = 0;

    funds[newGen] = funds[genesis];
    funds[genesis] = 0;

    nicknames[newGen] = nicknames[genesis];
    nicknames[genesis] = '';

    lastActivity[newGen] = now;
    lastActivity[genesis] = 0;

    genesis = newGen;

  }

  function transferChildren(address child) public {
    require(parents[child] == msg.sender);
    require(now - lastActivity[child] > deadLine);
    require(children[child].length > 0);

    for (uint256 i = 0; i < children[child].length; i++) {

      children[msg.sender].push(children[child][i]);
      parents[children[child][i]] = msg.sender;
      children[child][i] = 0x0;
    }

    children[child].length = 0;

    parents[child] = 0x0;

    funds[msg.sender] += funds[child];

    funds[child] = 0;

    //nicknames[child] = '';

    //lastActivity[child] = 0;

    //customers--;

    dieEvent(child, msg.sender);

    lastActivity[msg.sender] = now;

  }


}


//первые N входов по 0.05 эфир, затем цена наинает логарифмически расти
//можно докупить себе пропускной способности как бонус на время (по умолчанию 30%, можно сделать 40 50 60 платные)
//подумать какие еще временные бонусы могут быть их легко реализовать
//можно купить скидку на вход для своих детей как бонус
//убрать концепт админов



//первые N входов по 0.05 эфир, затем цена наинает логарифмически расти
//можно докупить себе пропускной способности как бонус на время (по умолчанию 30%, можно сделать 40 50 60 платные)
//подумать какие еще временные бонусы могут быть их легко реализовать
//можно купить скидку на вход для своих детей как бонус
//убрать концепт админов

//0x910e476b926663afa62f9e5efea048eed5a5c060

/*[
{
"anonymous": false,
"inputs": [
{
"indexed": false,
"name": "addr",
"type": "address"
},
{
"indexed": false,
"name": "amount",
"type": "uint256"
}
],
"name": "getFundsEvent",
"type": "event"
},
{
"anonymous": false,
"inputs": [
{
"indexed": false,
"name": "whoDied",
"type": "address"
},
{
"indexed": false,
"name": "whoReplaced",
"type": "address"
}
],
"name": "dieEvent",
"type": "event"
},
{
"anonymous": false,
"inputs": [
{
"indexed": false,
"name": "addr",
"type": "address"
},
{
"indexed": false,
"name": "parent",
"type": "address"
}
],
"name": "registrationEvent",
"type": "event"
},
{
"constant": false,
"inputs": [],
"name": "getMine",
"outputs": [],
"payable": false,
"stateMutability": "nonpayable",
"type": "function"
},
{
"constant": false,
"inputs": [],
"name": "getMineGenesis",
"outputs": [],
"payable": false,
"stateMutability": "nonpayable",
"type": "function"
},
{
"constant": false,
"inputs": [
{
"name": "admin",
"type": "address"
},
{
"name": "name",
"type": "string"
}
],
"name": "registerAdmin",
"outputs": [],
"payable": false,
"stateMutability": "nonpayable",
"type": "function"
},
{
"constant": false,
"inputs": [
{
"name": "parent",
"type": "address"
},
{
"name": "nickname",
"type": "string"
}
],
"name": "registration",
"outputs": [],
"payable": true,
"stateMutability": "payable",
"type": "function"
},
{
"constant": false,
"inputs": [
{
"name": "child",
"type": "address"
}
],
"name": "transferChildren",
"outputs": [],
"payable": false,
"stateMutability": "nonpayable",
"type": "function"
},
{
"constant": false,
"inputs": [
{
"name": "newGen",
"type": "address"
}
],
"name": "transferGenesis",
"outputs": [],
"payable": false,
"stateMutability": "nonpayable",
"type": "function"
},
{
"inputs": [
{
"name": "firstChild",
"type": "address"
}
],
"payable": false,
"stateMutability": "nonpayable",
"type": "constructor"
},
{
"constant": true,
"inputs": [],
"name": "capital",
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
"type": "address"
},
{
"name": "",
"type": "uint256"
}
],
"name": "children",
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
"constant": true,
"inputs": [],
"name": "currentPayment",
"outputs": [
{
"name": "payment",
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
"name": "customers",
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
"name": "deadLine",
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
"type": "address"
}
],
"name": "funds",
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
"name": "genesis",
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
"constant": true,
"inputs": [
{
"name": "addr",
"type": "address"
}
],
"name": "isNotRegistered",
"outputs": [
{
"name": "",
"type": "bool"
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
"type": "address"
}
],
"name": "lastActivity",
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
"name": "myAvailableFunds",
"outputs": [
{
"name": "myFunds",
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
"type": "address"
}
],
"name": "nicknames",
"outputs": [
{
"name": "",
"type": "string"
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
"type": "address"
}
],
"name": "parents",
"outputs": [
{
"name": "",
"type": "address"
}
],
"payable": false,
"stateMutability": "view",
"type": "function"
}
]*/
