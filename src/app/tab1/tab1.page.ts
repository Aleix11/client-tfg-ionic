import {Component, Inject} from '@angular/core';
import {UserService} from "../../providers/userService";
import {User} from "../../models/user";
import {ChatService} from "../../providers/chatService";
import { Storage } from '@ionic/storage';
import {BetService} from "../../providers/betService";
import {AlertController, LoadingController, ModalController} from '@ionic/angular';
import Web3 from "web3";
import {WEB3} from "../web3";
import {AbiItem} from "web3-utils";
import {ModalPasswordTwoPage} from './modal-password-two/modal-password-two.page';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  user: User = new User();
  numberMsg: number = 0;
  pendingBets = [];
  openBets = [];

  wallet: any = null;
  walletEncrypt: any;
  walletEncryptBool = false;

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

  constructor(private userService: UserService,
              @Inject(WEB3) private web3: Web3,
              private betService: BetService,
              private chatService: ChatService,
              public alertController: AlertController,
              private storage: Storage,
              public loadingController: LoadingController,
              public modalController: ModalController) {
      this.myContract = new web3.eth.Contract(this.abi, this.contractAddress);
  }

  ionViewDidEnter() {
      this.storage.get('user').then(user => {
          this.user = user;
          this.getNumberMessages();
          this.getBets();
      });
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

  getBets() {
    this.storage.get('token').then(token => {
        this.betService.getBetsPendingFromUser(this.user, token).subscribe((data) => {
            if(data) {
                this.pendingBets = data;
                console.log(this.pendingBets);
            }
        });
        this.betService.getBetsOpenFromUser(this.user, token).subscribe((data) => {
            if(data) {
                this.openBets = data;
            }
        });
    });
  }

  async closeBet(bet) {

      console.log('tokens: ', bet.tokens);
      const betCreate = this.myContract.methods.betCloseFromPendingCancelBet(bet.tokens, bet.id);
      const encodedABI = betCreate.encodeABI();

      const nonce = await this.web3.eth.getTransactionCount(bet.addressBettor1);

      const nonceString = nonce.toString(16);

      const tx = {
          gas: 1500000,
          gasPrice: '30000000000',
          from: bet.addressBettor1,
          data: encodedABI,
          chainId: 3,
          to: this.contractAddress,
          nonce: nonce
          // nonce: '0x' + nonceString
      };

      console.log(tx);

      const modal = await this.modalController.create({
          component: ModalPasswordTwoPage
      });

      modal.onDidDismiss()
          .then(async (data) => {
              console.log(data);

              if (data) {
                  await this.presentLoading();
                  console.log('wallet modal', data);
                  this.wallet = data.data;
                  console.log(this.wallet.accounts[0].privateKey);
              }

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
                      this.getBets();
                  })
                  .then((newContractInstance) => {
                      console.log('contractInstance', newContractInstance); // instance with the new contract address
                      if (newContractInstance && newContractInstance.events) {
                          console.log(newContractInstance.events);
                      } else {
                      }
                  });
              });

          });

      await modal.present();

      //TODO: TEST BETCLOSEFROMPENDING

      /*this.storage.get('token').then(token => {
          this.betService.closeBet(bet, token).subscribe(pendingBets => {
              if(pendingBets) {
                  this.pendingBets = pendingBets;
              }
          })
      });*/
  }


    async presentLoading() {
        this.loading = await this.loadingController.create({
            message: 'Please wait...',
            cssClass: 'custom-class custom-loading'
        });
        await this.loading.present();
    }
}
