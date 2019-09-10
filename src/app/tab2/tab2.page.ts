import {Component, Inject, OnInit} from '@angular/core';
import {UserService} from "../../providers/userService";
import {ChatService} from "../../providers/chatService";
import {User} from "../../models/user";
import { Storage } from '@ionic/storage';
import Web3 from "web3";
import {WEB3} from "../web3";
import {AbiItem} from "web3-utils";
import {PassUserService} from "../../providers/pass-data-service/passUserService";
import {PassWalletService} from "../../providers/pass-data-service/passWalletService";
import {Router} from "@angular/router";
import {LoadingController, ToastController} from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit{

  user: User = new User();
  numberMsg: number = 0;
  walletPassword: string;
  wallet: any = null;
  walletEncrypt: any;
  walletEncryptBool: boolean = false;
  nonWalletBool: boolean = false;
  walletDecryptBool: boolean = false;
  arrayAccounts = [];
  selectedAccount: any;
  tokens: number = 0;

  buyTokens = false;
  sellTokens = false;
  numberTokensBuy: number = 0;
  numberTokensSell: number = 0;

    contractAddress = "0xbf1e3315d6f064ac3111420991cfdadb99665d6d";
    myContract: any;

    loading: any;

    abi : AbiItem[] = [
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

  constructor(private router: Router,
              @Inject(WEB3) private web3: Web3,
              private userService: UserService,
              private chatService: ChatService,
              private toastController: ToastController,
              public loadingController: LoadingController,
              private passWalletService: PassWalletService,
              private storage: Storage) {

      this.myContract = new web3.eth.Contract(this.abi, this.contractAddress);
      console.log(this.web3, this.myContract);
  }

  async ngOnInit() {

  }

  ionViewDidEnter() {
      this.storage.get('user').then(user => {
          this.user = user;
          console.log('user', this.user);
          this.getNumberMessages();
      });
      if(this.wallet === null) {
          this.storage.get('wallet').then(wallet => {
              if(wallet) {
                  this.walletEncrypt = wallet;
                  console.log(wallet);
                  this.walletEncryptBool = true;
              } else {
                  this.storage.get('user').then(user => {
                      this.user = user;
                      if(this.user.wallet) {
                          this.walletEncrypt = this.user.wallet;
                          this.walletEncryptBool = true;
                      }
                  });
              }
          });
      } else {
          let i = 0;
          let bool = false;
          this.arrayAccounts = [];
          while(!bool){
              if(this.wallet.accounts[i]) {
                  this.arrayAccounts.push(this.wallet.accounts[i]);
                  i++;
              } else {
                  bool = true;
              }
          }
          this.user.selectedAccount = {
              address: this.selectedAccount.address,
              privateKey: this.selectedAccount.privateKey
          };
          this.storage.set('user', this.user);
      }
  }

  getNumberMessages() {
      this.storage.get('token').then(token => {
          this.userService.getUser(this.user._id, token).subscribe((data) => {
              this.user = data;
              this.chatService.getMessagesNotSeen(this.user, token).subscribe(messages => {
                  this.numberMsg = messages.number;
              });
          });
      });
  }

  async decryptWalletInfo() {
      if(this.walletPassword) {
          try {
              this.wallet = this.web3.eth.accounts.wallet.decrypt(this.walletEncrypt, this.walletPassword);
              this.walletEncryptBool = false;
              this.walletDecryptBool = true;
              let i = 0;
              let bool = false;
              this.arrayAccounts = [];
              while(!bool){
                  if(this.wallet.accounts[i]) {
                      this.arrayAccounts.push(this.wallet.accounts[i]);
                      i++;
                  } else {
                      bool = true;
                  }
              }
              console.log('tokens: ', this.tokens);
              this.selectedAccount = this.wallet.accounts[0];
              console.log('tokens: ', this.tokens, this.selectedAccount, this.myContract);
              await this.myContract.methods.balanceOf(this.selectedAccount.address).call({from: this.selectedAccount.address})
                  .then((result) => {
                      console.log('Result', result);
                      if(result) {
                          this.tokens =  parseInt(result._hex, 16);
                          console.log('tokens: ', this.tokens);
                          this.user.selectedAccount = {
                              address: this.selectedAccount.address,
                              privateKey: this.selectedAccount.privateKey
                          };
                          this.storage.set('user', this.user);
                      }
                  });
          } catch {
              const toast = await this.toastController.create({
                  message: 'Wrong password',
                  duration: 3000,
                  showCloseButton: true, color: 'dark'
              });
              toast.present();
          }
      } else {
          const toast = await this.toastController.create({
              message: 'Enter your password',
              duration: 3000,
              showCloseButton: true, color: 'dark'
          });
          toast.present();
      }
  }

  addAccount() {
      this.passWalletService.setWallet(this.walletEncrypt);
      this.router.navigate(['/menu/tabs/tab2/add-account']);
  }

  async categorySelection(event) {
      this.selectedAccount = event.detail.value;
      console.log('aquii llega', this.user, this.selectedAccount);
      this.user.selectedAccount = {
        address: this.selectedAccount.address,
        privateKey: this.selectedAccount.privateKey
      };
      this.storage.set('user', this.user);
      await this.myContract.methods.balanceOf(this.selectedAccount.address).call({from: this.selectedAccount.address})
          .then((result) => {
              console.log('Result', result);
              if(result) {
                  this.tokens =  parseInt(result._hex, 16);
              }
          });

  }

  async tokensBuy() {
      await this.presentLoading();
      let betCreate = this.myContract.methods.buyTokensPassEthers();
      let encodedABI = betCreate.encodeABI();

      let nonce = await this.web3.eth.getTransactionCount(this.selectedAccount.address);

      let nonceString = nonce.toString(16);

      console.log(this.numberTokensBuy / 900);
      console.log('wei', this.web3.utils.toWei(''+Math.floor(this.numberTokensBuy / 900 * 1000000000000000000) / 1000000000000000000, 'ether'));
      console.log('nonce', nonce);
      let tx = {
          gas: 1500000,
          gasPrice: '30000000000',
          from: this.selectedAccount.address,
          data: encodedABI,
          chainId: 3,
          to: this.contractAddress,
          nonce: nonce,
          value: this.web3.utils.toWei(''+Math.floor(this.numberTokensBuy / 900 * 1000000000000000000) / 1000000000000000000, 'ether')
          // nonce: '0x' + nonceString
      };

      this.web3.eth.accounts.signTransaction(tx, this.selectedAccount.privateKey).then(signed => {
          console.log('signed: ', signed);
          this.web3.eth.sendSignedTransaction(signed.rawTransaction).on('error', async (error) => {
              console.log('error ', error);
              await this.loading.dismiss();
          })
              .on('transactionHash', (transactionHash) => {
                  console.log('transactionHash', transactionHash);
              })
              .on('receipt', async (receipt) => {
                  console.log('receipt', receipt);
              })
              .on('confirmation', async (confirmationNumber, receipt) => {
                  await this.loading.dismiss();
                  console.log('confirmation', confirmationNumber, receipt);
                  const blockNumber = receipt.blockNumber;
                  this.myContract.getPastEvents('BuyTokensSendEthers', {
                      from: blockNumber,
                      to: blockNumber
                  }).then(async (events) => {
                      if (events[0]) {
                          const toast = await this.toastController.create({
                              message: 'Wait to get your E-bets...',
                              duration: 3000,
                              showCloseButton: true, color: 'dark'
                          });
                          toast.present();
                          const tokens = parseInt(events[0].returnValues.tokens._hex, 16);
                          console.log('events: ', events[0].returnValues.tokens, tokens);
                          if (tokens) {
                              this.storage.get('token').then(token => {
                                  console.log('1', events[0].returnValues.buyer, this.numberTokensBuy);
                                  this.userService.buyTokensPassTokens(events[0].returnValues.buyer, this.numberTokensBuy, token).subscribe(async data => {
                                      console.log('llega', data);
                                      if(data){
                                          await this.myContract.methods.balanceOf(this.selectedAccount.address).call({from: this.selectedAccount.address})
                                              .then(async (result) => {
                                                  console.log('Result', result);
                                                  if(result) {
                                                      this.tokens =  parseInt(result._hex, 16);
                                                      const toast = await this.toastController.create({
                                                          message: 'E-bets bought and added to your account',
                                                          duration: 3000,
                                                          showCloseButton: true, color: 'dark'
                                                      });
                                                      toast.present();
                                                  }
                                              });
                                      }
                                  });
                              });
                          }
                      } else {
                          console.log('no events');
                          const toast = await this.toastController.create({
                              message: 'There was an error, repeat the operation',
                              duration: 3000,
                              showCloseButton: true, color: 'dark'
                          });
                          toast.present();
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

  async tokensSell() {
      await this.presentLoading();
      let betCreate = this.myContract.methods.sellTokensPassTokens(this.numberTokensSell);
      let encodedABI = betCreate.encodeABI();

      let nonce = await this.web3.eth.getTransactionCount(this.selectedAccount.address);

      let nonceString = nonce.toString(16);

      console.log('wei', this.web3.utils.toWei(''+this.numberTokensSell / 900, 'ether'));
      let tx = {
          gas: 1500000,
          gasPrice: '30000000000',
          from: this.selectedAccount.address,
          data: encodedABI,
          chainId: 3,
          to: this.contractAddress,
          nonce: nonce,
          // nonce: '0x' + nonceString
      };

      this.web3.eth.accounts.signTransaction(tx, this.wallet.accounts[0].privateKey).then(signed => {
          console.log('signed: ', signed);
          this.web3.eth.sendSignedTransaction(signed.rawTransaction).on('error', async (error) => {
                  console.log('error', error);
                  await this.loading.dismiss();
                  const toast = await this.toastController.create({
                      message: 'Error: make sure you have enough gas',
                      duration: 3000,
                      showCloseButton: true, color: 'dark'
                  });
                  toast.present();
              })
              .on('transactionHash', (transactionHash) => {
                  console.log('transactionHash', transactionHash);
              })
              .on('receipt', async (receipt) => {
                  console.log('receipt', receipt);
              })
              .on('confirmation', async (confirmationNumber, receipt) => {
                  await this.loading.dismiss();
                  console.log('confirmation', confirmationNumber, receipt);
                  const blockNumber = receipt.blockNumber;
                  this.myContract.getPastEvents('SellTokensSendTokens', {
                      from: blockNumber,
                      to: blockNumber
                  }).then(async (events) => {
                      if (events[0]) {
                          const toast = await this.toastController.create({
                              message: 'Wait to get your ethers...',
                              duration: 3000,
                              showCloseButton: true, color: 'dark'
                          });
                          toast.present();
                          const tokens = parseInt(events[0].returnValues.tokens._hex, 16);
                          console.log('events: ', events[0].returnValues.tokens, tokens);
                          if (tokens) {
                              this.storage.get('token').then(token => {
                                  console.log('1', events[0].returnValues.buyer, this.numberTokensSell);
                                  this.userService.sellTokensPassEthers(events[0].returnValues.seller, this.numberTokensSell, token).subscribe(async data => {
                                      if(data){
                                          console.log(data);
                                          await this.myContract.methods.balanceOf(this.selectedAccount.address).call({from: this.selectedAccount.address})
                                              .then(async (result) => {
                                                  console.log('Result', result);
                                                  if(result) {
                                                      this.tokens =  parseInt(result._hex, 16);
                                                      const toast = await this.toastController.create({
                                                          message: 'E-bets sold and subtracted from your account',
                                                          duration: 3000,
                                                          showCloseButton: true, color: 'dark'
                                                      });
                                                      toast.present();
                                                  }
                                              });
                                      }
                                  });
                              });
                          }
                      } else {
                          console.log('no events');
                          const toast = await this.toastController.create({
                              message: 'There was an error, repeat the operation',
                              duration: 3000,
                              showCloseButton: true, color: 'dark'
                          });
                          toast.present();
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

    async presentLoading() {
        this.loading = await this.loadingController.create({
            message: 'Please wait...',
            cssClass: 'custom-class custom-loading'
        });
        await this.loading.present();
    }
}
