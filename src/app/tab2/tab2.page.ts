import {Component, Inject, OnInit} from '@angular/core';
import {UserService} from "../../providers/userService";
import {ChatService} from "../../providers/chatService";
import {User} from "../../models/user";
import { Storage } from '@ionic/storage';
import Web3 from "web3";
import {WEB3} from "../web3";
import {PassUserService} from "../../providers/pass-data-service/passUserService";
import {PassWalletService} from "../../providers/pass-data-service/passWalletService";
import {Router} from "@angular/router";

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

  constructor(private router: Router,
              @Inject(WEB3) private web3: Web3,
              private userService: UserService,
              private chatService: ChatService,
              private passWalletService: PassWalletService,
              private storage: Storage) {

  }

  async ngOnInit() {

  }

  async ionViewDidEnter() {
      this.storage.get('user').then(user => {
          this.user = user;
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

  decryptWalletInfo() {
      this.wallet = this.web3.eth.accounts.wallet.decrypt(this.walletEncrypt, this.walletPassword);
      this.walletEncryptBool = false;
      this.walletDecryptBool = true;
      let i = 0;
      let bool = false;
      while(!bool){
          if(this.wallet.accounts[i]) {
              this.arrayAccounts.push(this.wallet.accounts[i]);
              i++;
          } else {
              bool = true;
          }
      }
      this.selectedAccount = this.wallet.accounts[0];
      this.storage.get('token').then(token => {
          console.log('selectedAccount', this.selectedAccount);
          this.userService.getNumberTokens(this.selectedAccount.address, token).subscribe(data => {
              console.log('tokens', data);
              if(data) {
                  this.tokens = data.tokens[0];
              }
          });
      });
  }

  addAccount() {
      this.passWalletService.setWallet(this.walletEncrypt);
      this.router.navigate(['/menu/tabs/tab2/add-account']);
  }

  categorySelection(event) {
      console.log('eveent', event);
      this.selectedAccount = event.detail.value;
      this.storage.get('token').then(token => {
          console.log('selectedAccount', this.selectedAccount);
          this.userService.getNumberTokens(this.selectedAccount.address, token).subscribe(data => {
              console.log('tokens', data);
              if(data) {
                  this.tokens = data.tokens[0];
              }
          });
      });
  }
}
