import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import {IonicModule, Platform} from '@ionic/angular';

import { Tab5Page } from './tab5.page';
import {ChartsModule} from "ng2-charts";
import {ModalEditUserPage} from "./modal-edit-user/modal-edit-user.page";
import {Crop} from '@ionic-native/crop/ngx';
import {Camera} from '@ionic-native/camera/ngx';
import {Base64} from '@ionic-native/base64/ngx';

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
    ReactiveFormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    ChartsModule
  ],
  providers: [
      Crop,
      Camera,
      Platform,
      Base64
  ],
  declarations: [Tab5Page, ModalEditUserPage],
  entryComponents:[ModalEditUserPage]
})
export class Tab5PageModule {}
