import { Component, OnInit } from '@angular/core';
import {User} from "../../models/user";
import {UserService} from "../../providers/userService";
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {

  searchUser: string;
  segment: string = "bets";
  users: User[] = [];
  userSession: User = new User();

  constructor(private storage: Storage,
              private userService: UserService) {
    this.storage.get('user').then(user => {
      this.userSession = user;
    })
  }

  ngOnInit() {

  }

  segmentChanged(event) {
    if(event.detail.value === "users") {
      this.segment = "users";
      this.searchListUser('');
    } else {
      this.segment = "bets";
    }
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

  addOrDelete(usr: User) {
    let user = this.userSession.friends.find(friend => friend === usr._id);
    return !!user;
  }

  addFriend(friend) {
    this.storage.get('token').then(token => {
      let userObj = {
        user: this.userSession,
        friend: friend._id
      };
      this.userService.addFriend(userObj, token).subscribe(usr => {
          console.log(usr);
          if(usr._id) {
              this.userSession = usr;
          }
      });
    });
  }

  removeFriend(friend) {
    this.storage.get('token').then(token => {
        let userObj = {
            user: this.userSession,
            friend: friend._id
        };
      this.userService.removeFriend(userObj, token).subscribe(usr => {
        console.log(usr);
          if(usr._id) {
              this.userSession = usr;
          }
      });
    });
  }
}
