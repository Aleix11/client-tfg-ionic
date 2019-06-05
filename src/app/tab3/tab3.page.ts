import {Component, OnInit} from '@angular/core';
import {ModalController} from "@ionic/angular";
import {ModalFiltersBetsPage} from "./modal-filters-bets/modal-filters-bets.page";
import { Storage } from '@ionic/storage';
import {BetService} from "../../providers/betService";
import {Bet} from "../../models/bet";
import {Filters} from "../../models/filters";
import {PassFiltersService} from "../../providers/pass-data-service/passFiltersService";

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit{

  bets : Bet[] = [];
  filters: Filters = new Filters();
  constructor(private storage: Storage,
              private betsService: BetService,
              public passFiltersService: PassFiltersService,
              public modalController: ModalController) {
  }

  ngOnInit() {
      this.search();
  }

  async openFilters() {
      const modal = await this.modalController.create({
          component: ModalFiltersBetsPage
          // componentProps: { value: 123 }
      });

      modal.onDidDismiss()
          .then((data) => {
            console.log(data);
            this.search();
          });

      await modal.present();
  }

  search() {
      this.filters = this.passFiltersService.getFilters();
      console.log(this.filters);
      this.storage.get('token').then(token => {
          this.betsService.getPendingBets(this.filters, token).subscribe(bets => {
              if(bets) {
                  this.bets = bets;
              }
          })
      });
  }
}
