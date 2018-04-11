import EtherData from "ether";
import $ from "jquery"; // подключаем jQuery
import Web3 from "web3";

export default class Metamask {

  detectLevel() {

    return new Promise(function (resolve, reject) {

      if (typeof web3 !== 'undefined') {

        web3.version.getNetwork(function (error, networkId) {
          if (!error && networkId == 1) {

            web3.eth.getAccounts(function (error, accounts) {
              if (!error && accounts.length) {
                resolve(3)
              } else {
                if (error) {
                  reject(error)
                } else {
                  resolve(2);
                }
              }
            })

          } else {
            if (error) {
              reject(error);
            } else {
              resolve(1);
            }
          }
        })

      } else {
        resolve(0);
      }


    })

  }

  getAddr() {
    let acc = false;
    if (web3 && web3.eth && web3.eth.accounts && web3.eth.accounts[0]) {
      acc = web3.eth.accounts[0];
    }
    return acc;
  }

  games() {

    return {

      parseVal(type, val){
        let ret = val;
        /*if (type == 'uint256') {
         try {
         ret = parseInt(val.words[0])
         } catch (e) {
         console.error(e);
         }
         } else {
         //ret = val;
         }
         return ret;*/


        return val;
      },

      getContractInstance (gameId) {
        return new Promise(function (resolve, reject) {

          var web3 = new Web3('https://mainnet.infura.io/G6PuVMBuzi94Jru69sAz');

          var contract = new web3.eth.Contract(EtherData.contracts[gameId].abi, EtherData.contracts[gameId].address);
          resolve({contract});
        })
      },

      initWatcher(gameId, pNum){
        let self = this;

        return new Promise(function (resolve, reject) {

          $.getJSON(EtherData.abiUrl(gameId), function (data) {

            var MyContract = web3.eth.contract(data.abi);
            var myContractInstance = MyContract.at(EtherData.address[gameId]);

            resolve(
              {
                TicketSelling: myContractInstance.TicketSelling({periodNumber: pNum}, {
                  fromBlock: 0,
                  toBlock: 'latest'
                }),
                PeriodFinished: myContractInstance.PeriodFinished({periodNumber: pNum}, {
                  fromBlock: 0,
                  toBlock: 'latest'
                })
              }
            );


          }, function (e) {
            reject(e);
          })


        })
      },

      byTicket (gameId, nonce, pNum, price) {

        let self = this;

        return new Promise(function (resolve, reject) {

          let promise = self.getContractInstance(gameId)
          promise.then(function (lot) {

            resolve('URA')

            /*lot.contract.buyTicket(pNum, nonce, {
              from: web3.eth.accounts[0],
              value: price
            }, function (e, r) {
              if (e) {
                reject(e);
              }
              resolve(r);
            });*/

          }).catch(function (e) {
            reject(e);
          });
        });


      },

      getGameFields(gameId)
      {

        let self = this;

        return new Promise(function (resolve, reject) {

          self.getContractInstance(gameId).then(function (lot) {

            let fields = [];
            let filled = 0;
            let ret = {};

            for (let i = 0; i < EtherData.contracts[gameId].abi.length; i++) {
              if (EtherData.contracts[gameId].abi[i].constant && EtherData.contracts[gameId].abi[i].outputs.length == 1) {
                fields.push({
                  name: EtherData.contracts[gameId].abi[i].name,
                  type: EtherData.contracts[gameId].abi[i].outputs[0].type
                });
              }
            }

            ret['address'] = lot.contract.address;

            for (let i = 0; i < fields.length; i++) {


              lot.contract.methods[fields[i].name]().call().then(function (r) {
                ret[fields[i].name] = r;
                filled++;
                if (filled == fields.length) {
                  resolve(ret);
                }
              }).catch(function (e) {
                reject(e);
              });
            }

          }).catch(function (e) {
            reject(e);
          })
        })

      }
      ,


      getPeriodFields(gameId, pNum)
      {

        let self = this;

        return new Promise(function (resolve, reject) {
          // Эта функция будет вызвана автоматически

          // В ней можно делать любые асинхронные операции,
          // А когда они завершатся — нужно вызвать одно из:

          self.getContractInstance(gameId).then(function (lot) {

            lot.contract.methods.periods(pNum).call().then(function (r) {


              let filled = 0;
              let ret = {};
              let fields = [];

              for (let i = 0; i < EtherData.contracts[gameId].abi.length; i++) {
                if (EtherData.contracts[gameId].abi[i].name == 'periods') {
                  fields = EtherData.contracts[gameId].abi[i].outputs;
                }
              }

              if (fields.length) {
                for (let i = 0; i < fields.length; i++) {
                  ret[fields[i].name] = r[i];
                  filled++;
                  if (filled == fields.length) {
                    resolve(ret);
                  }
                }
              } else {
                reject();
              }


            }).catch(function (e) {
              reject(e);
            })


          }).catch(function (e) {
            reject(e);
          })

        });

      },


      getTicketFields(gameId, pNum, ticketAmount)
      {

        let self = this;

        return new Promise(function (resolve, reject) {
          // Эта функция будет вызвана автоматически

          // В ней можно делать любые асинхронные операции,
          // А когда они завершатся — нужно вызвать одно из:

          if (ticketAmount == 0) {
            resolve([]);
          } else {

            self.getContractInstance(gameId).then(function (lot) {


              let filled = 0;
              let ret = [];
              let fields = [];


              for (let i = 0; i < lot.data.abi.length; i++) {
                if (lot.data.abi[i].name == 'tickets') {
                  fields = lot.data.abi[i].outputs;
                }
              }


              if (fields.length) {

                for (var t = 0; t < ticketAmount; t++) {

                  lot.contract.tickets(pNum, t, function (e, r) {


                    var el = {};
                    for (var i = 0; i < fields.length; i++) {

                      el[fields[i].name] = r[i];

                    }
                    ret.push(el);

                    if (ret.length == ticketAmount) {
                      resolve(ret);
                    }


                  })
                }

              } else {
                resolve([]);
              }
            }).catch(function (e) {
              reject(e);
            })
          }

        });

      }
      ,

      getCurRound(gameId)
      {

        let self = this;

        let promise = new Promise(function (resolve, reject) {

          self.getContractInstance(gameId).then(function (lot) {

            lot.contract.currentPeriod(function (e, r) {

              if (e) {
                reject(e);
              }
              resolve(r);

            })
          })


          // reject(ошибка) при ошибке
        });


        return promise


      }

    }
  }

}



//infura

//https://mainnet.infura.io/G6PuVMBuzi94Jru69sAz
