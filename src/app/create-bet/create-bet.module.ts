import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CreateBetPage } from './create-bet.page';
import {ModalPasswordPage} from "./modal-password/modal-password.page";

const routes: Routes = [
  {
    path: '',
    component: CreateBetPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [CreateBetPage, ModalPasswordPage],
  entryComponents:[ModalPasswordPage]
})
export class CreateBetPageModule {}
