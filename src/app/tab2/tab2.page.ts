import {Component, Inject, OnInit} from '@angular/core';
import {UserService} from "../../providers/userService";
import {ChatService} from "../../providers/chatService";
import {User} from "../../models/user";
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit{

  user: User = new User();
  numberMsg: number = 0;

  constructor(private userService: UserService,
              private chatService: ChatService,
              private storage: Storage) {
      this.storage.get('user').then(user => {
          this.user = user;
      });
  }

  async ngOnInit() {

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
