import {Component, Inject, OnInit} from '@angular/core';
import {UserService} from "../../providers/userService";
import {Router} from "@angular/router";
import {User} from "../../models/user";
import {PassUserService} from "../../providers/pass-data-service/passUserService";
import { Storage } from '@ionic/storage';
import Web3 from "web3";
import {WEB3} from "../web3"

@Component({
  selector: 'app-register-wallet',
  templateUrl: './register-wallet.page.html',
  styleUrls: ['./register-wallet.page.scss'],
})
export class RegisterWalletPage implements OnInit {

  user : User = new User();
  privateKey : string = "";
  wallet: any;
  walletPassword: string;
  repeatWalletPassword: string;
  showSaveWallet: boolean = false;
  walletEncrypt: any;

  constructor(@Inject(WEB3) private web3: Web3,
              private router: Router,
              private storage: Storage,
              private passUserService: PassUserService,
              private userService: UserService) {
    this.user = this.passUserService.getUser();
  }

  ngOnInit() {
      this.web3.eth.accounts.wallet.clear();
      this.wallet = this.web3.eth.accounts.wallet.create(0);
      console.log(this.wallet, this.web3.eth.accounts.wallet);
  }

  async createAccount() {
      let account = await this.web3.eth.accounts.create();
      console.log(account);
      this.web3.eth.accounts.wallet.add(account);
      console.log(this.wallet, this.web3.eth.accounts.wallet);
      this.showSaveWallet = true;
  }

  importAccount(){
      this.web3.eth.accounts.wallet.add(this.privateKey);
      console.log(this.wallet.accounts, this.wallet);
      this.showSaveWallet = true;
  }

  next() {
    if(this.walletPassword === this.repeatWalletPassword) {
      this.walletEncrypt = this.web3.eth.accounts.wallet.encrypt(this.walletPassword);
      if(this.walletEncrypt) {
        this.storage.set('wallet', this.walletEncrypt);
        this.user.wallet = this.walletEncrypt;
        this.user.address = this.wallet.accounts[0].address;
        this.userService.register(this.user).subscribe(user => {
          if(user) {
              this.passUserService.setUser(user);
              this.storage.set('token', user.token);
              this.storage.set('user', user);
              this.router.navigate(['/menu/tabs/tab1'])
          }
        });
      } else {
        // Tooltip
      }
    } else {
      // Tooltip
    }
  }
}
