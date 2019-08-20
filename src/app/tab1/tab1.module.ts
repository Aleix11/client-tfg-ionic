import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab1Page } from './tab1.page';
import {HeaderMainPageModule} from "../header-main/header-main.module";
import {CreateBetPage} from '../create-bet/create-bet.page';
import {ModalPasswordTwoPage} from './modal-password-two/modal-password-two.page';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([
        { path: '', component: Tab1Page }
    ])
  ],
  declarations: [Tab1Page, ModalPasswordTwoPage],
  entryComponents:[ModalPasswordTwoPage]
})
export class Tab1PageModule {}
