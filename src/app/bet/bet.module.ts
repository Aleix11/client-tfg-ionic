import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { BetPage } from './bet.page';
import {CreateBetPage} from "../create-bet/create-bet.page";
import {ModalPasswordAcceptPage} from "./modal-password-accept/modal-password-accept.page";

const routes: Routes = [
  {
    path: '',
    component: BetPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [BetPage, ModalPasswordAcceptPage],
  entryComponents: [ModalPasswordAcceptPage],
  providers: [CreateBetPage]
})
export class BetPageModule {}
