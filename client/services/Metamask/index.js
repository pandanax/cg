import EtherData from "ether";
import $ from "jquery"; // подключаем jQuery

export default class Metamask {

  detectLevel() {

    let level = 0; //without all
    if (typeof web3 !== 'undefined') {

      level = 1; //with metamask

      if (web3.eth.accounts[0]) {
        level = 2; //with account
      }

    }


    return level

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

          $.getJSON(EtherData.abiUrl(gameId), function (data) {

            var MyContract = web3.eth.contract(data.abi);
            var lot = MyContract.at(EtherData.address[gameId]);

            resolve({contract: lot, data: data});
          }, function (e) {
            reject(e);
          })
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
                e1: myContractInstance.TicketSelling({periodNumber: pNum}, {fromBlock: 0, toBlock: 'latest'}),
                e2: myContractInstance.PeriodFinished({periodNumber: pNum}, {fromBlock: 0, toBlock: 'latest'})
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

          self.getContractInstance(gameId).then(function (lot) {

            lot.contract.buyTicket(pNum, nonce, {
              from: web3.eth.accounts[0],
              value: price
            }, function (e, r) {
              if (e) {
                reject(e);
              }
              resolve(r);
            });

          }).catch(function (e) {
            reject(e);
          });
        });


      },

      getGameFields (gameId) {

        let self = this;

        return new Promise(function (resolve, reject) {

          self.getContractInstance(gameId).then(function (lot) {

            let fields = [];
            let filled = 0;
            let ret = {};

            for (let i = 0; i < lot.data.abi.length; i++) {
              if (lot.data.abi[i].constant && lot.data.abi[i].outputs.length == 1) {
                fields.push({name: lot.data.abi[i].name, type: lot.data.abi[i].outputs[0].type});
              }
            }

            ret['address'] = lot.contract.address;

            for (let i = 0; i < fields.length; i++) {
              lot.contract[fields[i].name](function (e, r) {
                if (e) {
                  reject(e);
                }
                ret[fields[i].name] = r;
                filled++;
                if (filled == fields.length) {
                  resolve(ret);
                }
              })
            }

          }).catch(function (e) {
            reject(e);
          })
        })

      },


      getPeriodFields (gameId, pNum) {

        let self = this;

        return new Promise(function (resolve, reject) {
          // Эта функция будет вызвана автоматически

          // В ней можно делать любые асинхронные операции,
          // А когда они завершатся — нужно вызвать одно из:

          self.getContractInstance(gameId).then(function (lot) {

            lot.contract.periods(pNum, function (e, r) {

              if (e) {
                reject(e);
              }

              let filled = 0;
              let ret = {};
              let fields = [];

              for (let i = 0; i < lot.data.abi.length; i++) {
                if (lot.data.abi[i].name == 'periods') {
                  fields = lot.data.abi[i].outputs;
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


            })
          }).catch(function (e) {
            reject(e);
          })

        });

      },


      getTicketFields (gameId, pNum, ticketAmount) {

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

      },

      getCurRound (gameId) {

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


/*
 *
 setField: function (key, methods) {
 var self = this;
 methods[key]().call().then(function (r) {
 self[key] = r;
 if (key == 'currentPeriod') {
 self.setPeriodInfo(r, methods);
 }
 });
 },

 setPeriodTicketInfo: function (periodNumber, ticketNumber, methods) {
 var self = this;
 methods.tickets(periodNumber, ticketNumber).call().then(function (ticketData) {
 self.$set(self.tickets, ticketData[0], {number: ticketData[0], address: ticketData[1], hash: ticketData[2]});
 });
 },

 setPeriodInfo: function (periodNumber, methods) {
 var self = this;
 methods.periods(periodNumber).call().then(function (periodData) {
 for (var i = 0; i < self.periodFields.length; i++) {
 self.$set(self.period, self.periodFields[i], periodData[i]);
 if (self.periodFields[i] == 'ticketAmount' && periodData[i] > 0) {
 for (var j = 0; j < periodData[i]; j++) {
 self.setPeriodTicketInfo(periodNumber, j, methods);
 }
 }
 }
 });
 },

 initWatcher: function () {

 var self = this;

 let contract = new window.web3LocalHttp.eth.Contract(self.abi, addresses.lotery);

 contract.setProvider(window.web3LocalWebsocketProvider);

 contract.events.TicketSelling({
 fromBlock: 0,
 toBlock: 'latest'
 }, function (r,a,b) {
 console.log('RRR', r,a,b);
 })


 },

 initContract: function () {
 var self = this;
 self.$store.commit('INCREMENT');
 $.getJSON(addresses.loteryAbi, function (data) {
 self.abi = data.abi;
 let contract = new window.web3LocalHttp.eth.Contract(self.abi, addresses.lotery);
 for (var i = 0; i < self.fields.length; i++) {
 var key = self.fields[i];
 self.setField(key, contract.methods);
 }

 self.initWatcher();

 self.$store.commit('DECREMENT');
 }, function (e) {
 alert(e);
 self.$store.commit('DECREMENT');
 });
 },
 * */
