import { Component, OnInit } from '@angular/core';
import {User} from "../../models/user";
import {UserService} from "../../providers/userService";
import { Storage } from '@ionic/storage';
import {SummonerService} from "../../providers/summonerService";

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {

  searchUser: string;
  searchSummoner: string;
  segment: string = "users";
  users: User[] = [];
  userSession: User = new User();
  summoner: any = {};
  blank = true;

  constructor(private storage: Storage,
              private summonerService: SummonerService,
              private userService: UserService) {
    this.storage.get('user').then(user => {
      this.userSession = user;
    })
  }

  ngOnInit() {
      this.searchListUser('');
  }

  segmentChanged(event) {
    if(event.detail.value === "users") {
      this.segment = "users";
      this.searchListUser('');
    } else {
      this.segment = "summoners";
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

  editFavouriteSummoner(summoner) {
    console.log(summoner);
    this.userSession.summoners[0] = summoner;
    console.log(this.userSession.summoners[0]);
    this.storage.get('token').then(token => {
      this.userService.editFavouriteSummoner(this.userSession, token).subscribe(user =>{
        if(user) {
          this.userSession = user;
          console.log(this.userSession.summoners[0], summoner);
          this.storage.set('user', this.userSession);
        }
      })
    });
  }

  searchSummonerFunction() {
    this.storage.get('token').then(token => {
        // FUNCTION TO SEARCH SUMMONER
        this.summonerService.searchSummonerInfo({
            summonerName: this.searchSummoner
        }, token).subscribe(summoner => {
          if(summoner) {
            this.summoner = summoner;
            this.blank = false;
            console.log(this.summoner);
          }
        }, error => {
            console.log(error);
            this.summoner = null;
            this.blank = false;
        })
    });
  }

}
