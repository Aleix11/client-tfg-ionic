import { Component, OnInit } from '@angular/core';
import {MenuController} from "@ionic/angular";
import {MenuPage} from "../menu/menu.page";

@Component({
  selector: 'app-header-main',
  templateUrl: './header-main.page.html',
  styleUrls: ['./header-main.page.scss'],
})
export class HeaderMainPage implements OnInit {

  constructor(private menu: MenuController) { }

  ngOnInit() {
  }

  openCustom() {
      this.menu.enable(true, 'custom');
      this.menu.open('custom');
  }

}
