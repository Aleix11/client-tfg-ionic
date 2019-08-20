import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {Bet} from '../../models/bet';
import {SummonerService} from '../../providers/summonerService';
import {UserService} from '../../providers/userService';
import { Storage } from '@ionic/storage';
import {Game} from '../../models/game';
import {BetService} from '../../providers/betService';
import {User} from '../../models/user';
import {Router} from '@angular/router';
import {LoadingController, ModalController, ToastController} from '@ionic/angular';
import {WEB3} from '../web3';
import {AbiItem} from 'web3-utils';
import {ModalPasswordPage} from './modal-password/modal-password.page';
import Web3 from 'web3';
import {__await} from 'tslib';


@Component({
  selector: 'app-create-bet',
  templateUrl: './create-bet.page.html',
  styleUrls: ['./create-bet.page.scss'],
})
export class CreateBetPage implements OnInit {

  step = 0;
  bet: Bet = new Bet();
  game: Game = new Game();
  user: User = new User();
  time: Date;
  checkBoxList = [
    {
        value: 'teamA',
        isChecked: false
    }, {
        value: 'teamB',
        isChecked: false
    }
  ];
  wallet: any = null;
  walletEncrypt: any;
  walletEncryptBool = false;

  contractAddress = '0xbf1e3315d6f064ac3111420991cfdadb99665d6d';
  myContract: any;

  loading: any;

  abi: AbiItem[] = [
      {
          "constant": false,
          "inputs": [
              {
                  "name": "_spender",
                  "type": "address"
              },
              {
                  "name": "_tokens",
                  "type": "uint256"
              }
          ],
          "name": "approve",
          "outputs": [
              {
                  "name": "success",
                  "type": "bool"
              }
          ],
          "payable": false,
          "stateMutability": "nonpayable",
          "type": "function"
      },
      {
          "constant": false,
          "inputs": [
              {
                  "name": "_winner",
                  "type": "address"
              },
              {
                  "name": "_amount",
                  "type": "uint256"
              },
              {
                  "name": "_id",
                  "type": "uint256"
              }
          ],
          "name": "betClose",
          "outputs": [],
          "payable": false,
          "stateMutability": "nonpayable",
          "type": "function"
      },
      {
          "constant": false,
          "inputs": [
              {
                  "name": "_bettor1",
                  "type": "address"
              },
              {
                  "name": "_amount",
                  "type": "uint256"
              },
              {
                  "name": "_id",
                  "type": "uint256"
              }
          ],
          "name": "betCloseFromPending",
          "outputs": [],
          "payable": false,
          "stateMutability": "nonpayable",
          "type": "function"
      },
      {
          "constant": false,
          "inputs": [
              {
                  "name": "_amount",
                  "type": "uint256"
              },
              {
                  "name": "_id",
                  "type": "uint256"
              }
          ],
          "name": "betCloseFromPendingCancelBet",
          "outputs": [],
          "payable": false,
          "stateMutability": "nonpayable",
          "type": "function"
      },
      {
          "constant": false,
          "inputs": [
              {
                  "name": "_bettor1",
                  "type": "address"
              },
              {
                  "name": "_bettor2",
                  "type": "address"
              },
              {
                  "name": "_amount",
                  "type": "uint256"
              },
              {
                  "name": "_id",
                  "type": "uint256"
              }
          ],
          "name": "betCloseRemake",
          "outputs": [],
          "payable": false,
          "stateMutability": "nonpayable",
          "type": "function"
      },
      {
          "constant": false,
          "inputs": [
              {
                  "name": "_amount",
                  "type": "uint256"
              }
          ],
          "name": "betCreate",
          "outputs": [],
          "payable": false,
          "stateMutability": "nonpayable",
          "type": "function"
      },
      {
          "constant": false,
          "inputs": [
              {
                  "name": "_amount",
                  "type": "uint256"
              },
              {
                  "name": "_id",
                  "type": "uint256"
              }
          ],
          "name": "betOpen",
          "outputs": [],
          "payable": false,
          "stateMutability": "nonpayable",
          "type": "function"
      },
      {
          "constant": false,
          "inputs": [],
          "name": "buyTokensPassEthers",
          "outputs": [],
          "payable": true,
          "stateMutability": "payable",
          "type": "function"
      },
      {
          "constant": false,
          "inputs": [
              {
                  "name": "_address",
                  "type": "address"
              },
              {
                  "name": "_tokens",
                  "type": "uint256"
              }
          ],
          "name": "buyTokensPassTokens",
          "outputs": [],
          "payable": false,
          "stateMutability": "nonpayable",
          "type": "function"
      },
      {
          "constant": false,
          "inputs": [
              {
                  "name": "_address",
                  "type": "address"
              },
              {
                  "name": "_tokens",
                  "type": "uint256"
              }
          ],
          "name": "sellTokensPassEthers",
          "outputs": [],
          "payable": true,
          "stateMutability": "payable",
          "type": "function"
      },
      {
          "constant": false,
          "inputs": [
              {
                  "name": "_tokens",
                  "type": "uint256"
              }
          ],
          "name": "sellTokensPassTokens",
          "outputs": [],
          "payable": false,
          "stateMutability": "nonpayable",
          "type": "function"
      },
      {
          "constant": false,
          "inputs": [
              {
                  "name": "_to",
                  "type": "address"
              },
              {
                  "name": "_tokens",
                  "type": "uint256"
              }
          ],
          "name": "transfer",
          "outputs": [
              {
                  "name": "success",
                  "type": "bool"
              }
          ],
          "payable": false,
          "stateMutability": "nonpayable",
          "type": "function"
      },
      {
          "constant": false,
          "inputs": [
              {
                  "name": "_from",
                  "type": "address"
              },
              {
                  "name": "_to",
                  "type": "address"
              },
              {
                  "name": "_tokens",
                  "type": "uint256"
              }
          ],
          "name": "transferFrom",
          "outputs": [
              {
                  "name": "success",
                  "type": "bool"
              }
          ],
          "payable": false,
          "stateMutability": "nonpayable",
          "type": "function"
      },
      {
          "inputs": [],
          "payable": false,
          "stateMutability": "nonpayable",
          "type": "constructor"
      },
      {
          "anonymous": false,
          "inputs": [
              {
                  "indexed": false,
                  "name": "timestamp",
                  "type": "uint256"
              },
              {
                  "indexed": false,
                  "name": "id",
                  "type": "uint256"
              }
          ],
          "name": "BetPending",
          "type": "event"
      },
      {
          "anonymous": false,
          "inputs": [
              {
                  "indexed": false,
                  "name": "timestamp",
                  "type": "uint256"
              },
              {
                  "indexed": false,
                  "name": "id",
                  "type": "uint256"
              }
          ],
          "name": "BetOpened",
          "type": "event"
      },
      {
          "anonymous": false,
          "inputs": [
              {
                  "indexed": false,
                  "name": "timestamp",
                  "type": "uint256"
              },
              {
                  "indexed": false,
                  "name": "id",
                  "type": "uint256"
              }
          ],
          "name": "BetClosed",
          "type": "event"
      },
      {
          "anonymous": false,
          "inputs": [
              {
                  "indexed": false,
                  "name": "buyer",
                  "type": "address"
              },
              {
                  "indexed": false,
                  "name": "tokens",
                  "type": "uint256"
              }
          ],
          "name": "BuyTokensSendEthers",
          "type": "event"
      },
      {
          "anonymous": false,
          "inputs": [
              {
                  "indexed": false,
                  "name": "buyer",
                  "type": "address"
              },
              {
                  "indexed": false,
                  "name": "tokens",
                  "type": "uint256"
              }
          ],
          "name": "BuyTokensSendTokens",
          "type": "event"
      },
      {
          "anonymous": false,
          "inputs": [
              {
                  "indexed": false,
                  "name": "seller",
                  "type": "address"
              },
              {
                  "indexed": false,
                  "name": "tokens",
                  "type": "uint256"
              }
          ],
          "name": "SellTokensSendEthers",
          "type": "event"
      },
      {
          "anonymous": false,
          "inputs": [
              {
                  "indexed": false,
                  "name": "seller",
                  "type": "address"
              },
              {
                  "indexed": false,
                  "name": "tokens",
                  "type": "uint256"
              }
          ],
          "name": "SellTokensSendTokens",
          "type": "event"
      },
      {
          "anonymous": false,
          "inputs": [
              {
                  "indexed": true,
                  "name": "from",
                  "type": "address"
              },
              {
                  "indexed": true,
                  "name": "to",
                  "type": "address"
              },
              {
                  "indexed": false,
                  "name": "tokens",
                  "type": "uint256"
              }
          ],
          "name": "Transfer",
          "type": "event"
      },
      {
          "anonymous": false,
          "inputs": [
              {
                  "indexed": true,
                  "name": "tokenOwner",
                  "type": "address"
              },
              {
                  "indexed": true,
                  "name": "spender",
                  "type": "address"
              },
              {
                  "indexed": false,
                  "name": "tokens",
                  "type": "uint256"
              }
          ],
          "name": "Approval",
          "type": "event"
      },
      {
          "constant": true,
          "inputs": [
              {
                  "name": "_tokenOwner",
                  "type": "address"
              },
              {
                  "name": "_spender",
                  "type": "address"
              }
          ],
          "name": "allowance",
          "outputs": [
              {
                  "name": "remaining",
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
                  "name": "_owner",
                  "type": "address"
              }
          ],
          "name": "balanceOf",
          "outputs": [
              {
                  "name": "_balance",
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
          "name": "bets",
          "outputs": [
              {
                  "name": "amount",
                  "type": "uint256"
              },
              {
                  "name": "state",
                  "type": "uint8"
              },
              {
                  "name": "bettor1",
                  "type": "address"
              },
              {
                  "name": "bettor2",
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
                  "name": "_id",
                  "type": "uint256"
              }
          ],
          "name": "betState",
          "outputs": [
              {
                  "name": "state",
                  "type": "uint8"
              }
          ],
          "payable": false,
          "stateMutability": "view",
          "type": "function"
      },
      {
          "constant": true,
          "inputs": [],
          "name": "name",
          "outputs": [
              {
                  "name": "_name",
                  "type": "string"
              }
          ],
          "payable": false,
          "stateMutability": "pure",
          "type": "function"
      },
      {
          "constant": true,
          "inputs": [],
          "name": "symbol",
          "outputs": [
              {
                  "name": "_symbol",
                  "type": "string"
              }
          ],
          "payable": false,
          "stateMutability": "pure",
          "type": "function"
      },
      {
          "constant": true,
          "inputs": [],
          "name": "tokenBuyPrice",
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
          "name": "tokenSellPrice",
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
          "name": "totalSupply",
          "outputs": [
              {
                  "name": "_totalSupply",
                  "type": "uint256"
              }
          ],
          "payable": false,
          "stateMutability": "view",
          "type": "function"
      }
  ];

  maxTokens : number = 0;

  constructor(private summonerService: SummonerService,
              private storage: Storage,
              public modalController: ModalController,
              public loadingController: LoadingController,
              private router: Router,
              @Inject(WEB3) private web3: Web3,
              private toastController: ToastController,
              private betService: BetService,
              private userService: UserService) {
      this.storage.get('user').then(user => {
          this.user = user;
          if (!this.user.address) {
              // reedirect to wallet to take an account
          } else {
              this.getTokens(this.user.address);
          }
      });

      console.log(this.contractAddress);
      this.myContract = new web3.eth.Contract(this.abi, this.contractAddress);

      console.log(this.myContract);

      this.storage.get('wallet').then(wallet => {
          if (wallet) {
              this.walletEncrypt = wallet;
              console.log(wallet);
              this.walletEncryptBool = true;
          } else {
              if (this.user.wallet) {
                  this.walletEncrypt = this.user.wallet;
                  this.walletEncryptBool = true;
              }
          }
      });
  }

  ngOnInit() {
  }

  async getTokens(address) {
      await this.myContract.methods.balanceOf(address).call({from: address})
          .then((result) => {
              console.log('Result', result);
              if(result) {
                  this.maxTokens =  parseInt(result._hex, 16);
              }
          });
  }

  searchSummoner() {
    console.log('bet', this.bet.summoner);
    if (this.bet.summoner) {
        this.storage.get('token').then(token => {
            this.summonerService.searchSummoner({
                summonerName: this.bet.summoner
            }, token).subscribe(game => {
                console.log(game);
                if (game) {
                    this.game = game;
                    this.clock();
                    this.step = 1;
                }
            }, err => {
                console.log(err);
            });
        });
    }
  }

  changeTeam(team) {
      if (team === 'teamA') {
          this.checkBoxList[0].isChecked = true;
          this.checkBoxList[1].isChecked = false;
          this.bet.teamBettor1 = 'Team A';
          console.log('A', this.checkBoxList, team);
      } else if (team === 'teamB') {
          this.checkBoxList[0].isChecked = false;
          this.checkBoxList[1].isChecked = true;
          this.bet.teamBettor1 = 'Team B';
          console.log('B', this.checkBoxList, team);
      }
  }

  teamSelected() {
      if (this.bet.teamBettor1) {
          this.step = 2;
      }
  }

  minutesSelected() {
      console.log(this.bet);
      if (this.bet.duration) {
          this.step = 3;
      }
  }
  tokensSelected() {
      console.log(this.bet);
      if (this.bet.tokens) {
          this.step = 4;
      }
  }

  async createBet() {
      this.bet.bettor1 = this.user.username;
      this.bet.addressBettor1 = this.user.address;
      this.bet.gameId = this.game._id;
      const betObject = {
        bet: this.bet,
        betId: null
      };

      console.log('tokens: ', this.bet.tokens);
      const betCreate = this.myContract.methods.betCreate(this.bet.tokens);
      const encodedABI = betCreate.encodeABI();

      const nonce = await this.web3.eth.getTransactionCount(this.bet.addressBettor1);

      const nonceString = nonce.toString(16);

      const tx = {
          gas: 1500000,
          gasPrice: '30000000000',
          from: this.bet.addressBettor1,
          data: encodedABI,
          chainId: 3,
          to: this.contractAddress,
          nonce
          // nonce: '0x' + nonceString
      };

      const modal = await this.modalController.create({
          component: ModalPasswordPage
      });

      modal.onDidDismiss()
          .then(async (data) => {
              console.log(data);

              if (data) {
                  await this.presentLoading();
                  console.log('wallet modal', data);
                  this.wallet = data.data;
                  console.log(this.wallet.accounts[0].privateKey);
                  // Fer find de la address del objecte user amb les addres de la wallet

                  this.web3.eth.accounts.signTransaction(tx, this.wallet.accounts[0].privateKey).then(signed => {
                      console.log('signed: ', signed);
                      this.web3.eth.sendSignedTransaction(signed.rawTransaction).on('error', (error) => {
                          console.log('error', error);
                      })
                          .on('transactionHash', (transactionHash) => {
                              console.log('transactionHash', transactionHash);
                          })
                          .on('receipt', async (receipt) => {
                              console.log('receipt', receipt);
                          })
                          .on('confirmation', (confirmationNumber, receipt) => {
                              console.log('confirmation', confirmationNumber, receipt);
                              const blockNumber = receipt.blockNumber;
                              this.myContract.getPastEvents('BetPending', {
                                  from: blockNumber,
                                  to: blockNumber
                              }).then((events) => {
                                  if (events[0]) {
                                      const betId = parseInt(events[0].returnValues.id._hex, 16);
                                      console.log('events: ', events[0].returnValues.id._hex, betId);
                                      if (betId) {
                                          this.storage.get('token').then(token => {
                                              betObject.betId = betId;
                                              this.betService.bet(betObject, token).subscribe(async bet => {
                                                  console.log(bet);
                                                  if (bet) {
                                                      await this.loading.dismiss();

                                                      const toast = await this.toastController.create({
                                                          message: 'Bet created',
                                                          duration: 3000,
                                                          showCloseButton: true, color: 'dark'
                                                      });
                                                      toast.present();
                                                      this.router.navigate(['/menu/tabs/tab1']);
                                                  }
                                              });
                                          });
                                      }
                                  } else {
                                      setTimeout(() => {
                                          const betId = parseInt(events[0].returnValues.id._hex, 16);
                                          console.log('events: ', events[0].returnValues.id._hex, betId);
                                          if (betId) {
                                              this.storage.get('token').then(token => {
                                                  betObject.betId = betId;
                                                  this.betService.bet(betObject, token).subscribe(async bet => {
                                                      console.log(bet);
                                                      if (bet) {
                                                          await this.loading.dismiss();

                                                          const toast = await this.toastController.create({
                                                              message: 'Bet created',
                                                              duration: 3000,
                                                              showCloseButton: true, color: 'dark'
                                                          });
                                                          toast.present();
                                                          this.router.navigate(['/menu/tabs/tab1']);
                                                      }
                                                  });
                                              });
                                          }
                                      }, 2000);
                                  }
                              });


                          })
                          .then((newContractInstance) => {
                              console.log('contractInstance', newContractInstance); // instance with the new contract address
                              if (newContractInstance && newContractInstance.events) {
                                  console.log(newContractInstance.events);
                              } else {
                              }
                          });
                  });
              }
          });
      return await modal.present();
  }

  async presentLoading() {
      this.loading = await this.loadingController.create({
          message: 'Please wait...',
          cssClass: 'custom-class custom-loading'
      });
      await this.loading.present();
  }

  clock() {
      setInterval(() => {
              this.time = new Date(Math.trunc(Date.now()) - Math.trunc(this.game.gameStartTime));
          },
          1000
      );
  }

  public champions(id) {
        switch (id) {
            case 266: return 'Aatrox'; break;
            case 412: return 'Thresh'; break;
            case 23: return 'Tryndamere'; break;
            case 79: return 'Gragas'; break;
            case 69: return 'Cassiopeia'; break;
            case 136: return 'AurelionSol'; break;
            case 13: return 'Ryze'; break;
            case 78: return 'Poppy'; break;
            case 14: return 'Sion'; break;
            case 1: return 'Annie'; break;
            case 202: return 'Jhin'; break;
            case 43: return 'Karma'; break;
            case 111: return 'Nautilus'; break;
            case 240: return 'Kled'; break;
            case 99: return 'Lux'; break;
            case 103: return 'Ahri'; break;
            case 2: return 'Olaf'; break;
            case 112: return 'Viktor'; break;
            case 34: return 'Anivia'; break;
            case 27: return 'Singed'; break;
            case 86: return 'Garen'; break;
            case 127: return 'Lissandra'; break;
            case 57: return 'Maokai'; break;
            case 25: return 'Morgana'; break;
            case 28: return 'Evelynn'; break;
            case 105: return 'Fizz'; break;
            case 74: return 'Heimerdinger'; break;
            case 238: return 'Zed'; break;
            case 68: return 'Rumble'; break;
            case 82: return 'Mordekaiser'; break;
            case 37: return 'Sona'; break;
            case 96: return 'KogMaw'; break;
            case 55: return 'Katarina'; break;
            case 117: return 'Lulu'; break;
            case 22: return 'Ashe'; break;
            case 30: return 'Karthus'; break;
            case 12: return 'Alistar'; break;
            case 122: return 'Darius'; break;
            case 67: return 'Vayne'; break;
            case 110: return 'Varus'; break;
            case 77: return 'Udyr'; break;
            case 89: return 'Leona'; break;
            case 126: return 'Jayce'; break;
            case 134: return 'Syndra'; break;
            case 80: return 'Pantheon'; break;
            case 92: return 'Riven'; break;
            case 121: return 'Khazix'; break;
            case 42: return 'Corki'; break;
            case 268: return 'Azir'; break;
            case 51: return 'Caitlyn'; break;
            case 76: return 'Nidalee'; break;
            case 85: return 'Kennen'; break;
            case 3: return 'Galio'; break;
            case 45: return 'Veigar'; break;
            case 432: return 'Bard'; break;
            case 150: return 'Gnar'; break;
            case 90: return 'Malzahar'; break;
            case 104: return 'Graves'; break;
            case 254: return 'Vi'; break;
            case 10: return 'Kayle'; break;
            case 39: return 'Irelia'; break;
            case 64: return 'LeeSin'; break;
            case 420: return 'Illaoi'; break;
            case 60: return 'Elise'; break;
            case 106: return 'Volibear'; break;
            case 20: return 'Nunu'; break;
            case 4: return 'TwistedFate'; break;
            case 24: return 'Jax'; break;
            case 102: return 'Shyvana'; break;
            case 429: return 'Kalista'; break;
            case 36: return 'DrMundo'; break;
            case 427: return 'Ivern'; break;
            case 131: return 'Diana'; break;
            case 223: return 'TahmKench'; break;
            case 63: return 'Brand'; break;
            case 113: return 'Sejuani'; break;
            case 8: return 'Vladimir'; break;
            case 154: return 'Zac'; break;
            case 421: return 'RekSai'; break;
            case 133: return 'Quinn'; break;
            case 84: return 'Akali'; break;
            case 163: return 'Taliyah'; break;
            case 18: return 'Tristana'; break;
            case 120: return 'Hecarim'; break;
            case 15: return 'Sivir'; break;
            case 236: return 'Lucian'; break;
            case 107: return 'Rengar'; break;
            case 19: return 'Warwick'; break;
            case 72: return 'Skarner'; break;
            case 54: return 'Malphite'; break;
            case 157: return 'Yasuo'; break;
            case 101: return 'Xerath'; break;
            case 17: return 'Teemo'; break;
            case 75: return 'Nasus'; break;
            case 58: return 'Renekton'; break;
            case 119: return 'Draven'; break;
            case 35: return 'Shaco'; break;
            case 50: return 'Swain'; break;
            case 91: return 'Talon'; break;
            case 40: return 'Janna'; break;
            case 115: return 'Ziggs'; break;
            case 245: return 'Ekko'; break;
            case 61: return 'Orianna'; break;
            case 114: return 'Fiora'; break;
            case 9: return 'Fiddlesticks'; break;
            case 31: return 'Chogath'; break;
            case 33: return 'Rammus'; break;
            case 7: return 'Leblanc'; break;
            case 16: return 'Soraka'; break;
            case 26: return 'Zilean'; break;
            case 56: return 'Nocturne'; break;
            case 222: return 'Jinx'; break;
            case 83: return 'Yorick'; break;
            case 6: return 'Urgot'; break;
            case 203: return 'Kindred'; break;
            case 21: return 'MissFortune'; break;
            case 62: return 'MonkeyKing'; break;
            case 53: return 'Blitzcrank'; break;
            case 98: return 'Shen'; break;
            case 201: return 'Braum'; break;
            case 5: return 'XinZhao'; break;
            case 29: return 'Twitch'; break;
            case 11: return 'MasterYi'; break;
            case 44: return 'Taric'; break;
            case 32: return 'Amumu'; break;
            case 41: return 'Gangplank'; break;
            case 48: return 'Trundle'; break;
            case 38: return 'Kassadin'; break;
            case 161: return 'Velkoz'; break;
            case 143: return 'Zyra'; break;
            case 267: return 'Nami'; break;
            case 59: return 'JarvanIV'; break;
            case 81: return 'Ezreal'; break;
            case 145: return 'Kaisa'; break;
            case 142: return 'Zoe'; break;
            case 517: return 'Sylas'; break;
            case 518: return 'Neeko'; break;
            case 555: return 'Pyke'; break;
            case 516: return 'Ornn'; break;
            case 164: return 'Camille'; break;
            case 497: return 'Rakan'; break;
            case 498: return 'Xayah'; break;
            case 141: return 'Kayn'; break;
            case 350: return 'Yuumi'; break;
        }
  }
}
