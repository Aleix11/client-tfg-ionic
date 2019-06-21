import {Component, Input, OnInit} from '@angular/core';
import {ModalController} from "@ionic/angular";
import {User} from "../../../models/user";

@Component({
  selector: 'app-modal-edit-user',
  templateUrl: './modal-edit-user.page.html',
  styleUrls: ['./modal-edit-user.page.scss'],
})
export class ModalEditUserPage implements OnInit {

  @Input() user: User;

  constructor(private modalCtrl: ModalController) {

  }

  ngOnInit() {
      console.log(this.user);
  }

  async closeModal() {
        const modal = await this.modalCtrl.getTop();
        modal.dismiss();
  }

}
