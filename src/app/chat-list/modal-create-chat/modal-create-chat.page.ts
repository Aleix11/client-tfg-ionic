import { Component, OnInit } from '@angular/core';
import {ModalController} from "@ionic/angular";
import {User} from "../../../models/user";
import { Storage } from '@ionic/storage';
import {UserService} from "../../../providers/userService";
import {Router} from "@angular/router";
import {PassChatUsers} from "../../../providers/pass-data-service/passChatUsers";

@Component({
  selector: 'app-modal-create-chat',
  templateUrl: './modal-create-chat.page.html',
  styleUrls: ['./modal-create-chat.page.scss'],
})
export class ModalCreateChatPage implements OnInit {

  userSession: User = new User();
  users: User[] = [];
  searchUser: string;

  constructor(private router: Router,
              private modalCtrl: ModalController,
              private passChatUsers: PassChatUsers,
              private userService: UserService,
              public storage: Storage) {
      this.storage.get('user').then( (user) => {
          this.userSession = user;
      });
  }

  ngOnInit() {
    this.searchListUser('');
  }

  async closeModal() {
      const modal = await this.modalCtrl.getTop();
      modal.dismiss();
  }

  searchListUser(value) {
      this.storage.get('token').then(token => {
          this.userService.searchUser({
              user: value
          }, token).subscribe(users => {
              if(users) {
                  this.users = users;
              }
          });
      });
  }

  createChat(usr) {
      this.passChatUsers.setData({
          from: this.userSession,
          to: usr,
          userNick: this.userSession.username
      });
      this.router.navigate(['/chat']);
      this.closeModal();
  }
}
