import { Component, OnInit } from '@angular/core';
import {MenuController} from "@ionic/angular";
import {Router, RouterEvent} from "@angular/router";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage {

    selectedPath = '';
    constructor(private router: Router,
                private menu: MenuController) {
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
}
