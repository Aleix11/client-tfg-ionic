import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { Tab5Page } from './tab5.page';
import {ChartsModule} from "ng2-charts";
import {ModalEditUserPage} from "./modal-edit-user/modal-edit-user.page";

const routes: Routes = [
  {
    path: '',
    component: Tab5Page
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
      ChartsModule
  ],
  declarations: [Tab5Page, ModalEditUserPage],
    entryComponents:[ModalEditUserPage]
})
export class Tab5PageModule {}
