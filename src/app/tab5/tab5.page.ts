import {Component, OnInit} from '@angular/core';
import { Storage } from '@ionic/storage';
import {User} from "../../models/user";
import {UserService} from "../../providers/userService";
import {Bet} from "../../models/bet";
import {BetService} from "../../providers/betService";
import {ChartType, ChartOptions} from "chart.js";
import {Label, ChartsModule} from "ng2-charts";
import {ModalController} from "@ionic/angular";
import {ModalEditUserPage} from "./modal-edit-user/modal-edit-user.page";

@Component({
  selector: 'app-tab5',
  templateUrl: './tab5.page.html',
  styleUrls: ['./tab5.page.scss'],
})
export class Tab5Page implements OnInit {

  segment: string = "bets";
  user: User = new User();
  bets: Bet[] = [];
    public pieChartOptions: ChartOptions = {
        responsive: true,
        legend: {
            display: true,
            labels: {
                fontColor: 'rgb(255, 255, 255)'
            }
        },
        plugins: {
            datalabels: {
                formatter: (value, ctx) => {
                    const label = ctx.chart.data.labels[ctx.dataIndex];
                    return label;
                },
            },
        }
    };
    public pieChartLabels: Label[] = ['Wins', 'Losses'];
    public pieChartData: number[] = [0, 0];
    public pieChartType: ChartType = 'pie';
    public pieChartLegend = false;
    public pieChartColors = [
        {
            backgroundColor: ['rgba(0,255,0,0.3)', 'rgba(255,0,0,0.3)',],
        },
    ];

  constructor(private storage: Storage,
              public modalController: ModalController,
              private betsService: BetService,
              private userService: UserService) {
      this.storage.get('user').then(user => {
          this.storage.get('token').then(token => {
              this.userService.getUser(user._id, token).subscribe(user => {
                  if (user) {
                      console.log('user: ', user);
                      this.user = user;
                      this.pieChartData[0] = this.user.stats.wins;
                      this.pieChartData[1] = this.user.stats.losses;
                      this.storage.set('user', user);
                      this.searchListBets();
                  }
              });
          });
      });
  }

  ngOnInit() {
  }

  segmentChanged(event) {
      if(event.detail.value === "statics") {
          this.segment = "statics";
      } else {
          this.segment = "bets";
      }
  }

  searchListBets() {
      this.storage.get('token').then(token => {
        this.betsService.getBetsFromUser(this.user.username, token).subscribe(bets => {
          if(bets) {
            this.bets = bets;
          }
        });
      });
  }


  async presentModal() {
    const modal = await this.modalController.create({
        component: ModalEditUserPage,
        componentProps: { user: this.user }
    });
    return await modal.present();
  }
}
