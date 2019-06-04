import { Component, OnInit } from '@angular/core';
import {UserService} from "../../providers/userService";
import {Router} from "@angular/router";
import {User} from "../../models/user";
import {PassUserService} from "../../providers/pass-data-service/passUserService";
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-register-wallet',
  templateUrl: './register-wallet.page.html',
  styleUrls: ['./register-wallet.page.scss'],
})
export class RegisterWalletPage implements OnInit {

  user : User = new User();
  privateKey : string = "";
  constructor(private router: Router,
              private storage: Storage,
              private passUserService: PassUserService,
              private userService: UserService) {
    this.user = this.passUserService.getUser();
  }

  ngOnInit() {
  }

  createWallet() {
      this.storage.get('token').then(token => {
          this.userService.createWallet(this.user, token).subscribe(user => {
              if(user) {
                  this.passUserService.setUser(user);
                  this.router.navigate(['/register-wallet'])
              }
      });
    });
  }

  loadWallet() {
    let load = {
        user: this.user,
        privateKey: this.privateKey
    };

    this.storage.get('token').then(token => {

    });
  }

}
