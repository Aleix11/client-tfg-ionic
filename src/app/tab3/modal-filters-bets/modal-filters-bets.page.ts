import { Component, OnInit } from '@angular/core';
import {ModalController} from "@ionic/angular";
import {Filters} from "../../../models/filters";
import {PassFiltersService} from "../../../providers/pass-data-service/passFiltersService";

@Component({
  selector: 'app-modal-filters-bets',
  templateUrl: './modal-filters-bets.page.html',
  styleUrls: ['./modal-filters-bets.page.scss'],
})
export class ModalFiltersBetsPage implements OnInit {

  filters: Filters = new Filters();
  tokens: any = {
      lower: 0, upper: 100
  };
  duration: any = {
    lower: 0, upper: 60
  };
  constructor(public passFiltersService: PassFiltersService,
              private modalCtrl: ModalController) {
      this.filters = this.passFiltersService.getFilters();
      this.tokens.upper = this.filters.maxTokens;
      this.tokens.lower = this.filters.minTokens;
      this.duration.upper = this.filters.maxDuration;
      this.duration.lower = this.filters.minDuration;
  }

  ngOnInit() {
  }

  async closeModal() {
      this.passFiltersService.setFilters(this.filters);
      const modal = await this.modalCtrl.getTop();
      modal.dismiss();
  }

  changeTokensValue(event) {
    this.filters.maxTokens = event.upper;
    this.filters.minTokens = event.lower;
  }

  changeDurationValue(event) {
      this.filters.maxDuration = event.upper;
      this.filters.minDuration = event.lower;
  }
}
