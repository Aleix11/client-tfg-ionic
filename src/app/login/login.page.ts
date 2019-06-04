import { Component, OnInit } from '@angular/core';
import {UserService} from "../../providers/userService";
import {User} from "../../models/user";
import {Router} from "@angular/router";
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  user: User = new User();
  constructor(private router: Router,
              private storage: Storage,
              private userService: UserService) { }

  ngOnInit() {
  }

  logIn() {
    this.userService.login(this.user).subscribe(user => {
      if(user) {
          this.storage.set('token', user.token);
          this.storage.set('user', user);
        this.router.navigate(['/menu/tabs/tab1'])
      }
    });
  }

}
