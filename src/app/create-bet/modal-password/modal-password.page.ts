import {Component, Inject, OnInit} from '@angular/core';
import {ModalController, ToastController} from '@ionic/angular';
import Web3 from "web3";
import {WEB3} from "../../web3";
import { Storage } from '@ionic/storage';
import {User} from "../../../models/user";

@Component({
  selector: 'app-modal-password',
  templateUrl: './modal-password.page.html',
  styleUrls: ['./modal-password.page.scss'],
})
export class ModalPasswordPage implements OnInit {
  wallet: any = null;
  walletEncrypt: any;
  walletPassword: string = '';
  user : User = new User();

  constructor(public modalController: ModalController,
              private storage: Storage,
              private toastController: ToastController,
              @Inject(WEB3) private web3: Web3) {
      this.storage.get('wallet').then(wallet => {
          if(wallet) {
              this.walletEncrypt = wallet;
              console.log(wallet);
          } else {
              this.storage.get('user').then(user => {
                  this.user = user;
                  if(this.user.wallet) {
                      this.walletEncrypt = this.user.wallet;
                  }
              });
          }
      });
  }

  ngOnInit() {
  }

  async closeModal() {
      const modal = await this.modalController.getTop();
      modal.dismiss();
  }

  async decryptWalletInfo() {
      if(this.walletPassword) {
          try {
      this.wallet = this.web3.eth.accounts.wallet.decrypt(this.walletEncrypt, this.walletPassword);
      const modal = await this.modalController.getTop();
      modal.dismiss(this.wallet);
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
}
