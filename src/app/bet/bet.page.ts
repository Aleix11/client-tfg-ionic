import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import {ActivatedRoute, Router} from "@angular/router";
import {BetService} from "../../providers/betService";
import {Bet} from "../../models/bet";
import {Game} from "../../models/game";
import {User} from "../../models/user";
import {CreateBetPage} from "../create-bet/create-bet.page";
import {ToastController} from "@ionic/angular";

@Component({
  selector: 'app-bet',
  templateUrl: './bet.page.html',
  styleUrls: ['./bet.page.scss'],
})
export class BetPage implements OnInit {

  bet: Bet = new Bet();
  game: Game = new Game();
  user: User = new User();
  time: Date;

  constructor(private storage: Storage,
              private createBetPage: CreateBetPage,
              private router: Router,
              private betService: BetService,
              private toastController: ToastController,
              private route: ActivatedRoute) {

  }

  ngOnInit() {
      this.storage.get('user').then(user => {
          this.user = user;
          if(!this.user.address) {
              // reedirect to wallet to take an account
          }
      });
      let id = this.route.snapshot.paramMap.get('id');
      this.storage.get('token').then(token => {
        this.betService.getBet({id: id}, token).subscribe(response => {
          this.bet = response.bet;
          if(this.bet.duration > Date.now()/1000){
              this.clock();
          }
          this.bet.duration = (this.bet.duration - Math.floor(Date.now()/1000))/60;
          this.game = response.game;
          console.log(this.bet, this.game);
        })
      })
  }

  clock() {
      setInterval(() => {
              this.time = new Date(Math.trunc(Date.now()) - Math.trunc(this.game.gameStartTime));
          },
          1000
      );
      setInterval(() => {
              this.bet.duration = this.bet.duration - 1;
          },
          60000
      );

  }
  acceptBet() {
      this.bet.bettor2 = this.user.username;
      this.bet.addressBettor2 = this.user.address;
      console.log('teeam', this.bet.teamBettor1);
      if(this.bet.teamBettor1 === 'Team A') {
          this.bet.teamBettor2 = 'Team B';
      } else if(this.bet.teamBettor1 === 'Team B') {
          this.bet.teamBettor2 = 'Team A';
      }
      console.log(this.bet);

      let bet = {
        bet: this.bet
      };
      this.storage.get('token').then(token => {
        this.betService.acceptBet(bet, token).subscribe(async bet => {
          console.log(bet);
            if(bet) {
                // APOSTA ACCEPTA
                const toast = await this.toastController.create({
                    message: 'Bet accepted',
                    duration: 3000,
                    showCloseButton: true, color: 'dark'
                });
                toast.present();
                this.router.navigate(['/menu/tabs/tab1']);
            }
        });
      });
  }

}
