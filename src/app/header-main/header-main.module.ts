import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { HeaderMainPage } from './header-main.page';
import {MenuPageModule} from "../menu/menu.module";

const routes: Routes = [
  {
    path: '',
    component: HeaderMainPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [HeaderMainPage],
  exports: [HeaderMainPage]
})
export class HeaderMainPageModule {}
