import {Component, Inject, OnInit} from '@angular/core';
import { Storage } from '@ionic/storage';
import {ActivatedRoute, Router} from "@angular/router";
import {BetService} from "../../providers/betService";
import {Bet} from "../../models/bet";
import {Game} from "../../models/game";
import {User} from "../../models/user";
import {CreateBetPage} from "../create-bet/create-bet.page";
import {LoadingController, ModalController, ToastController} from "@ionic/angular";
import {AbiItem} from "web3-utils";
import {WEB3} from "../web3";
import Web3 from "web3";
import {ModalPasswordAcceptPage} from "./modal-password-accept/modal-password-accept.page";

@Component({
  selector: 'app-bet',
  templateUrl: './bet.page.html',
  styleUrls: ['./bet.page.scss'],
})
export class BetPage implements OnInit {

  bet: Bet = new Bet();
  game: Game = new Game();
  user: User = new User();
  time: Date;

    wallet: any = null;
    walletEncrypt: any;
    walletEncryptBool: boolean = false;

    contractAddress = "0x7010c0e292652fc7f7bd0a6eb7308063ae72e776";
    myContract: any;

    loading: any;

    abi : AbiItem[] = [
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
        }
    ];

  constructor(private storage: Storage,
              @Inject(WEB3) private web3: Web3,
              private createBetPage: CreateBetPage,
              private router: Router,
              public loadingController: LoadingController,
              private betService: BetService,
              private toastController: ToastController,
              public modalController: ModalController,
              private route: ActivatedRoute) {

      console.log(this.contractAddress);
      this.myContract = new web3.eth.Contract(this.abi, this.contractAddress);

      console.log(this.myContract);
  }

  ngOnInit() {
      this.storage.get('user').then(user => {
          this.user = user;
          if(!this.user.address) {
              // reedirect to wallet to take an account
          }
      });
      let id = this.route.snapshot.paramMap.get('id');
      this.storage.get('token').then(token => {
        this.betService.getBet({id: id}, token).subscribe(response => {
          this.bet = response.bet;
          if(this.bet.duration > Date.now()/1000){
              this.clock();
          }
          this.bet.duration = (this.bet.duration - Math.floor(Date.now()/1000))/60;
          this.game = response.game;
          console.log(this.bet, this.game);
        })
      });
  }

  clock() {
      setInterval(() => {
              this.time = new Date(Math.trunc(Date.now()) - Math.trunc(this.game.gameStartTime));
          },
          1000
      );
      setInterval(() => {
              this.bet.duration = this.bet.duration - 1;
          },
          60000
      );

  }
  async acceptBet() {
      this.bet.bettor2 = this.user.username;
      this.bet.addressBettor2 = this.user.address;
      console.log('teeam', this.bet.teamBettor1);
      if(this.bet.teamBettor1 === 'Team A') {
          this.bet.teamBettor2 = 'Team B';
      } else if(this.bet.teamBettor1 === 'Team B') {
          this.bet.teamBettor2 = 'Team A';
      }
      console.log(this.bet);

      let bet = {
        bet: this.bet
      };

      let betCreate = this.myContract.methods.betOpen(this.bet.tokens, this.bet.id);
      let encodedABI = betCreate.encodeABI();

      let nonce = await this.web3.eth.getTransactionCount(this.bet.addressBettor2);

      let nonceString = nonce.toString(16);

      let tx = {
          gas: 1500000,
          gasPrice: '30000000000',
          from: this.bet.addressBettor2,
          data: encodedABI,
          chainId: 3,
          to: this.contractAddress,
          nonce: nonce
          // nonce: '0x' + nonceString
      };

      console.log(tx);
      const modal1 = await this.modalController.create({
          component: ModalPasswordAcceptPage
      });

      modal1.onDidDismiss()
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
                              let blockNumber = receipt.blockNumber;
                              this.myContract.getPastEvents('BetOpened', {
                                  from: blockNumber,
                                  to: blockNumber
                              }).then((events) => {
                                  if(events[0]) {
                                      let betId = parseInt(events[0].returnValues.id._hex,16);
                                      console.log('events: ', events[0].returnValues.id._hex, betId);
                                      if(betId) {
                                          this.storage.get('token').then(token => {
                                              this.betService.acceptBet(bet, token).subscribe(async bet => {
                                                  console.log(bet);
                                                  if(bet) {
                                                      await this.loading.dismiss();

                                                      // APOSTA ACCEPTA
                                                      const toast = await this.toastController.create({
                                                          message: 'Bet accepted',
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
                                      setTimeout(function () {
                                          let betId = parseInt(events[0].returnValues.id._hex,16);
                                          console.log('events: ', events[0].returnValues.id._hex, betId);
                                          if(betId) {
                                              this.storage.get('token').then(token => {
                                                  this.betService.acceptBet(bet, token).subscribe(async bet => {
                                                      console.log(bet);
                                                      if(bet) {
                                                          await this.loading.dismiss();

                                                          // APOSTA ACCEPTA
                                                          const toast = await this.toastController.create({
                                                              message: 'Bet accepted',
                                                              duration: 3000,
                                                              showCloseButton: true, color: 'dark'
                                                          });
                                                          toast.present();
                                                          this.router.navigate(['/menu/tabs/tab1']);
                                                      }
                                                  });
                                              });
                                          }
                                      }, 1000)
                                  }
                              })
                          })
                          .then((newContractInstance) => {
                              console.log('contractInstance', newContractInstance); // instance with the new contract address
                              if(newContractInstance && newContractInstance.events) {
                                  console.log(newContractInstance.events);
                              } else {
                              }
                          });
                  });
              }
          });
      return await modal1.present()
  }

  async presentLoading() {
    this.loading = await this.loadingController.create({
        message: 'Please wait...',
        cssClass: 'custom-class custom-loading'
    });
    await this.loading.present();
  }

}
