pragma solidity ^0.4.0;


contract Genesis {

  event Signup(address addr, address parent);

  event Raise(address addr, uint amount);

  event Payment(address addr, uint amount);

  event Kill(address addr);

  mapping (address => address[]) public children;

  mapping (address => address) public parents;

  mapping (address => uint) public funds;

  mapping (address => string) public nicknames;

  mapping (address => uint) public lastActivity;

  mapping (address => uint) public payments;

  mapping (address => uint) bonusFlowSize;

  mapping (address => uint) bonusFlowSizeExpired;

  uint defaultFlowSize = 50;

  uint public customers;

  uint public capital;

  uint public constant deadLine = 180 days; //bring him child

  address public genesis; //first element in genesis net

  modifier onlyGenesisOrAdmin() {
    require(msg.sender == genesis || parents[msg.sender] == genesis);
    _;
  }
  modifier onlyGenesis() {
    require(msg.sender == genesis);
    _;
  }

  modifier withFunds() {
    //funds for me?
    require(funds[msg.sender] > 0);
    _;
  }


  function isNotRegistered(address addr) constant public returns (bool){
    if (parents[addr] == 0x0 && children[addr].length == 0) {return true;}
    return false;
  }

  function currentPayment(address parentAddress) public constant returns (uint payment){
    return payments[parentAddress];
  }



  //create first element
  function Genesis(address firstChild, uint initialEnter) {

    require(msg.sender != firstChild);
    genesis = msg.sender;
    nicknames[genesis] = 'Genesis';
    parents[genesis] = 0x0;
    payments[genesis] = 0;
    customers++;
    registerAdmin(firstChild, 'Admin', initialEnter);

  }


  function registerAdmin(address admin, string name, uint enter) onlyGenesis public {
    require(isNotRegistered(admin));
    nicknames[admin] = name;
    parents[admin] = msg.sender;
    payments[admin] = enter;
    children[genesis].push(admin);
    customers++;
    lastActivity[genesis] = now;
    lastActivity[admin] = now;
  }

  function bytesToAddress(bytes b) constant returns (address) {
    uint result = 0;
    for (uint i = b.length - 1; i + 1 > 0; i--) {
      uint c = uint(b[i]);
      uint to_inc = c * (16 ** ((b.length - i - 1) * 2));
      result += to_inc;
    }
    return address(result);
  }

  function() payable public {
    bytes memory d = msg.data;
    registration(bytesToAddress(msg.data), "");
  }

  function setNickname(string nickname) public {
    nicknames[msg.sender] = nickname;
  }

  //user registration
  function registration(address parent, string nickname) payable public {

    //payment is greater
    require(msg.value >= payments[parent]);

    //child is not registered
    require(isNotRegistered(msg.sender));

    //parent is registered
    require(!isNotRegistered(parent));

    //set nick
    nicknames[msg.sender] = nickname;

    //set parent for user
    parents[msg.sender] = parent;

    //push new child for parent
    children[parent].push(msg.sender);

    //increase funds for parent
    funds[parent] += msg.value;

    //event
    Signup(msg.sender, parent);

    Payment(msg.sender, msg.value);

    capital += msg.value;
    customers++;

    //first child activity
    lastActivity[msg.sender] = now;
    //parent activity update
    lastActivity[parent] = now;


  }

  function getBonusFlowSize(address sender) public constant returns (uint percents) {
    if (bonusFlowSize[sender] > 0 && now > bonusFlowSizeExpired[sender]) {return bonusFlowSize[sender];}
    return 0;
  }

  function increaseBonus(uint bonus, uint dayCount) private {

    require(msg.value >= payments[msg.sender]);
    bonusFlowSize[msg.sender] = bonus;
    bonusFlowSizeExpired[msg.sender] = now + dayCount * 24 * 60 * 60;
    Payment(msg.sender, msg.value);
    capital += msg.value;

  }

  function increaseBonusFlowSize10p10d() payable public {

    increaseBonus(10, 10);
  }

  function increaseBonusFlowSize20p20d() payable public {

    increaseBonus(20, 20);

  }

  function increaseBonusFlowSize30p30d() payable public {

    increaseBonus(30, 30);

  }

  //every user
  function getMine() public withFunds {

    require(!isNotRegistered(msg.sender));
    //is not genesis
    require(msg.sender != genesis);

    uint mine = myAvailableFunds();

    funds[parents[msg.sender]] += funds[msg.sender] - mine;

    funds[msg.sender] = 0;

    msg.sender.transfer(mine);

    Raise(msg.sender, mine);

    lastActivity[msg.sender] = now;

  }

  function myAvailableFunds() public constant returns (uint myFunds) {
    return availableFundsOf(msg.sender);
  }

  function availableFundsOf(address addr) public constant returns (uint availableFunds) {
    return funds[addr] * defaultFlowSize / 100 + funds[addr] * getBonusFlowSize(addr) / 100;
  }


  function getMineGenesis() public onlyGenesis withFunds {

    //for me
    uint mine = funds[msg.sender];

    funds[msg.sender] = 0;

    msg.sender.transfer(mine);

    Raise(msg.sender, mine);

    lastActivity[msg.sender] = now;

  }

  function killByDeadline(address child) public onlyGenesisOrAdmin {

    require(now > lastActivity[child] + deadLine);
    require(children[child].length > 0);

    for (uint i = 0; i < children[child].length; i++) {

      children[parents[child]].push(children[child][i]);
      parents[children[child][i]] = parents[child];
      children[child][i] = 0x0;
    }

    for (uint j = 0; j < children[parents[child]].length; j++) {

      if (children[parents[child]][j] == child) {
        delete children[parents[child]][j];
        break;
      }
    }

    children[child].length = 0;

    funds[msg.sender] += funds[child];

    funds[child] = 0;

    nicknames[child] = '';

    lastActivity[child] = 0;

    Kill(child);

    lastActivity[msg.sender] = now;

    parents[child] = 0x0;

    customers--;


  }


  function transferUser(address newGen) public {

    //new genesis is not member
    require(isNotRegistered(newGen));
    require(!isNotRegistered(msg.sender));

    for (uint i = 0; i < children[msg.sender].length; i++) {

      children[newGen].push(children[msg.sender][i]);
      parents[children[msg.sender][i]] = newGen;
      children[msg.sender][i] = 0x0;

    }

    if (parents[msg.sender] != 0x0) {

      for (uint j = 0; j < children[parents[msg.sender]].length; j++) {

        if (children[parents[msg.sender]][j] == msg.sender) {
          delete children[parents[msg.sender]][j];
          break;
        }
      }
    }

    children[msg.sender].length = 0;

    funds[newGen] = funds[msg.sender];
    funds[msg.sender] = 0;

    payments[newGen] = payments[msg.sender];
    payments[msg.sender] = 0;


    bonusFlowSize[newGen] = bonusFlowSize[msg.sender];
    bonusFlowSize[msg.sender] = 0;

    bonusFlowSizeExpired[newGen] = bonusFlowSizeExpired[msg.sender];
    bonusFlowSizeExpired[msg.sender] = 0;

    nicknames[newGen] = nicknames[msg.sender];
    nicknames[msg.sender] = '';

    lastActivity[newGen] = now;
    lastActivity[msg.sender] = 0;

  }


  function pushFundsInsteadChild(address child) public {

    require(parents[child] == msg.sender || parents[parents[child]] == msg.sender || parents[parents[parents[child]]] == msg.sender);
    require(children[child].length > 0);
    require(funds[child] > 0);
    require(!isNotRegistered(child));

    uint reward = availableFundsOf(child);

    funds[parents[child]] += funds[child] - reward;

    funds[child] = 0;

    child.transfer(reward);

    Raise(child, reward);

    lastActivity[msg.sender] = now;

  }


}


//"0x23B3d7671b37Ea2A270fBeba084F1668DB3201F7","10000000000000000"
//0x7046afcfd68cb6bb2ad5463fe90943e50ed0ce86

