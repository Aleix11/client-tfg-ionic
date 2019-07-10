import { Component } from '@angular/core';
import {UserService} from "../../providers/userService";
import {User} from "../../models/user";
import {ChatService} from "../../providers/chatService";
import { Storage } from '@ionic/storage';
import {BetService} from "../../providers/betService";
import {AlertController} from "@ionic/angular";

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

  constructor(private userService: UserService,
              private betService: BetService,
              private chatService: ChatService,
              public alertController: AlertController,
              private storage: Storage) {
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
      const alert = await this.alertController.create({
          header: 'Are you sure you want to close this bet?',
          message: 'The gas of the transaction will be charged to you',
          buttons: [
              {
                  text: 'Cancel',
                  role: 'cancel',
                  cssClass: 'secondary',
                  handler: (blah) => {

                  }
              }, {
                  text: 'Okay',
                  handler: () => {
                      console.log('Confirm Okay');
                      this.storage.get('token').then(token => {
                          this.betService.closeBet(bet, token).subscribe(pendingBets => {
                              if(pendingBets) {
                                  this.pendingBets = pendingBets;
                              }
                          })
                      });
                  }
              }
          ]
      });

      await alert.present();
  }
}
