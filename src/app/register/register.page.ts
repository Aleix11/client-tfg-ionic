import { Component, OnInit } from '@angular/core';
import {UserService} from "../../providers/userService";
import {Router} from "@angular/router";
import {User} from "../../models/user";
import {PassUserService} from "../../providers/pass-data-service/passUserService";
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  user: User = new User();
  repeatPassword : string = '';

  constructor(private router: Router,
              private storage: Storage,
              private passUserService: PassUserService,
              private userService: UserService) { }

  ngOnInit() {
  }

  register() {
    if(this.user.password === this.repeatPassword) {
        this.passUserService.setUser(this.user);
        this.router.navigate(['/register-wallet'])
    } else {
      // Tooltip Passwords are not equal
    }

  }

}
