import {Component, Inject, OnInit} from '@angular/core';
import {UserService} from "../../providers/userService";
import {ChatService} from "../../providers/chatService";
import {User} from "../../models/user";
import Web3 from "web3";
import {WEB3} from "../web3";
import {Router} from "@angular/router";
import {PassUserService} from "../../providers/pass-data-service/passUserService";
import {PassWalletService} from "../../providers/pass-data-service/passWalletService";
import { Storage } from '@ionic/storage';
import {ToastController} from '@ionic/angular';

@Component({
  selector: 'app-add-account',
  templateUrl: './add-account.page.html',
  styleUrls: ['./add-account.page.scss'],
})
export class AddAccountPage implements OnInit {

  user : User = new User();
  numberMsg : number = 0;
  privateKey : string = "";
  wallet: any;
  walletPassword: string;
  showSaveWallet: boolean = false;
  showAccountWallet: boolean = false;
  showPassWallet: boolean = true;
  walletEncrypt: any;
  accounts = [];

  constructor(@Inject(WEB3) private web3: Web3,
              private userService: UserService,
              private chatService: ChatService,
              private toastController: ToastController,
              private router: Router,
              private storage: Storage,
              private passUserService: PassUserService,
              private passWalletService: PassWalletService) {
      this.walletEncrypt = this.passWalletService.getWallet();
  }

  ngOnInit() {
  }

  async ionViewDidEnter() {
      this.storage.get('user').then(user => {
          this.user = user;
          this.getNumberMessages();
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

  async enter() {
    if(this.walletPassword) {
        try {
            this.wallet = await this.web3.eth.accounts.wallet.decrypt(this.walletEncrypt, this.walletPassword);
            this.showAccountWallet = true;
            this.showPassWallet = false;
            console.log('walleet', this.wallet, this.wallet.accounts);
            let bool = true;
            let i = 0;
            this.accounts = [];
            while(bool) {
                if(this.wallet.accounts[i]){
                    this.accounts.push(this.wallet.accounts[i].address);
                    console.log(this.accounts);
                    i++;
                } else {
                    bool = false;
                }
            }
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

  async createAccount() {
      try {
          let account = await this.web3.eth.accounts.create();
          console.log(account);
          this.web3.eth.accounts.wallet.add(account);
          console.log(this.wallet, this.web3.eth.accounts.wallet);
          this.showSaveWallet = true;
          let bool = true;
          let i = 0;
          this.accounts = [];
          while(bool) {
              if(this.wallet.accounts[i]){
                  this.accounts.push(this.wallet.accounts[i].address);
                  console.log(this.accounts);
                  i++;
              } else {
                  bool = false;
              }
          }
      } catch  {
          const toast = await this.toastController.create({
              message: 'Error creating account',
              duration: 3000,
              showCloseButton: true, color: 'dark'
          });
          toast.present();
      }

  }

  async importAccount() {
      try {
          this.web3.eth.accounts.wallet.add(this.privateKey);
          console.log(this.wallet.accounts, this.wallet);
          this.showSaveWallet = true;
          let bool = true;
          let i = 0;
          this.accounts = [];
          while(bool) {
              if(this.wallet.accounts[i]){
                  this.accounts.push(this.wallet.accounts[i].address);
                  console.log(this.accounts);
                  i++;
              } else {
                  bool = false;
              }
          }
      } catch {
          const toast = await this.toastController.create({
              message: 'Error importing account',
              duration: 3000,
              showCloseButton: true, color: 'dark'
          });
          toast.present();
      }
  }

  async save() {
      try {
          this.walletEncrypt = this.web3.eth.accounts.wallet.encrypt(this.walletPassword);
          if(this.walletEncrypt) {
              this.storage.set('wallet', this.walletEncrypt);
              this.user.wallet = this.walletEncrypt;
              this.storage.get('token').then(token => {
                  this.userService.editUser(this.user, token).subscribe(user => {
                      if(user) {
                          this.passUserService.setUser(user);
                          this.storage.set('user', user);
                          this.router.navigate(['/menu/tabs/tab2'])
                      }
                  });
              });
          } else {
              const toast = await this.toastController.create({
                  message: 'Error saving account',
                  duration: 3000,
                  showCloseButton: true, color: 'dark'
              });
              toast.present();
          }
      } catch {
          const toast = await this.toastController.create({
              message: 'Error saving account',
              duration: 3000,
              showCloseButton: true, color: 'dark'
          });
          toast.present();
      }

  }
}
