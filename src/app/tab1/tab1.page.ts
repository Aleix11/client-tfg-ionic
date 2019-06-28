import { Component } from '@angular/core';
import {UserService} from "../../providers/userService";
import {User} from "../../models/user";
import {ChatService} from "../../providers/chatService";
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  user: User = new User();
  numberMsg: number = 0;

  constructor(private userService: UserService,
              private chatService: ChatService,
              private storage: Storage) {
      this.storage.get('user').then(user => {
          this.user = user;
      });
  }

  ionViewDidEnter() {
    this.getNumberMessages()
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

}
