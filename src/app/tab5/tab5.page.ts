import {Component, OnInit} from '@angular/core';
import { Storage } from '@ionic/storage';
import {User} from "../../models/user";
import {UserService} from "../../providers/userService";
import {Bet} from "../../models/bet";
import {BetService} from "../../providers/betService";
import {ChartType, ChartOptions} from "chart.js";
import {Label, ChartsModule} from "ng2-charts";

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
            position: 'top',
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
    public pieChartData: number[] = [2, 6];
    public pieChartType: ChartType = 'pie';
    public pieChartLegend = false;
    public pieChartColors = [
        {
            backgroundColor: ['rgba(255,0,0,0.3)', 'rgba(0,255,0,0.3)',],
        },
    ];

  constructor(private storage: Storage,
              private betsService: BetService,
              private userService: UserService) {
      this.storage.get('user').then(user => {
          this.storage.get('token').then(token => {
              this.userService.getUser(user._id, token).subscribe(user => {
                  if (user) {
                      console.log('user: ', user);
                      this.user = user;
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
            this.calculationStatics();
          }
        });
      });
  }

  calculationStatics() {

  }
}
