import { Component, OnInit } from '@angular/core';
import {MenuController} from "@ionic/angular";
import {Router, RouterEvent} from "@angular/router";
import { Storage } from '@ionic/storage';
import {User} from "../../models/user";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage {

    selectedPath = '';
    user: User = new User();
    constructor(private router: Router,
                private storage: Storage,
                private menu: MenuController) {
        this.storage.get('user').then(user => {
            this.user = user;
        });
        this.router.events.subscribe((event: RouterEvent) => {
            if (event && event.url) {
                this.selectedPath = event.url;
            }
        })
    }

    openCustom() {
        this.menu.enable(true, 'custom');
        this.menu.open('custom');
    }

    logOut() {
        this.storage.clear();
        this.menu.close('custom');
        this.router.navigate(['']);
    }
}
