import {Component, OnInit, ViewChild} from '@angular/core';
import {Bet} from "../../models/bet";
import {SummonerService} from "../../providers/summonerService";
import {UserService} from "../../providers/userService";
import { Storage } from '@ionic/storage';
import {Game} from "../../models/game";
import {BetService} from "../../providers/betService";
import {User} from "../../models/user";
import {Router} from "@angular/router";

@Component({
  selector: 'app-create-bet',
  templateUrl: './create-bet.page.html',
  styleUrls: ['./create-bet.page.scss'],
})
export class CreateBetPage implements OnInit {

  step: number = 0;
  bet: Bet = new Bet();
  game: Game = new Game();
  user: User = new User();
  time: Date;
  checkBoxList = [
    {
        value:"teamA",
        isChecked: false
    },{
        value:"teamB",
        isChecked: false
    }
  ];

  constructor(private summonerService: SummonerService,
              private storage: Storage,
              private router: Router,
              private betService: BetService,
              private userService: UserService) {
      this.storage.get('user').then(user => {
          this.user = user;
          if(!this.user.address) {
              // reedirect to wallet to take an account
          }
      })
  }

  ngOnInit() {
  }

  searchSummoner() {
    console.log('bet', this.bet.summoner);
    if(this.bet.summoner) {
        this.storage.get('token').then(token => {
            this.summonerService.searchSummoner({
                summonerName: this.bet.summoner
            }, token).subscribe(game => {
                console.log(game);
                if(game) {
                    this.game = game;
                    this.clock();
                    this.step = 1;
                }
            }, err => {
                console.log(err);
            });
        });
    }
  }

  changeTeam(team) {
      if(team === 'teamA') {
          this.checkBoxList[0].isChecked = true;
          this.checkBoxList[1].isChecked = false;
          this.bet.team = 'Team A';
          console.log('A', this.checkBoxList, team);
      } else if(team === 'teamB') {
          this.checkBoxList[0].isChecked = false;
          this.checkBoxList[1].isChecked = true;
          this.bet.team = 'Team B';
          console.log('B', this.checkBoxList, team);
      }
  }

  teamSelected() {
      if(this.bet.team) {
          this.step = 2;
      }
  }

  minutesSelected() {
      console.log(this.bet);
      if(this.bet.duration) {
          this.step = 3;
      }
  }
  tokensSelected() {
      console.log(this.bet);
      if(this.bet.tokens) {
          this.step = 4;
      }
  }

  createBet() {
      this.bet.duration = Date.now() + this.bet.duration*60*1000;
      let betObject = {
        bet: this.bet,
        address: this.user.address
      };
      this.storage.get('token').then(token => {
          this.betService.bet(betObject, token).subscribe(bet => {
            console.log(bet);
            if(bet) {
                // APOSTA FETA
                this.router.navigate(['/menu/tabs/tab1']);
            }
          });
      });
  }

  clock() {
      setInterval(() => {
              this.time = new Date(Math.trunc(Date.now()) - Math.trunc(this.game.gameStartTime));
          },
          1000
      );
  }

  private champions(id) {
        switch(id){
            case 266: return "Aatrox"; break;
            case 412: return "Thresh"; break;
            case 23: return "Tryndamere"; break;
            case 79: return "Gragas"; break;
            case 69: return "Cassiopeia"; break;
            case 136: return "AurelionSol"; break;
            case 13: return "Ryze"; break;
            case 78: return "Poppy"; break;
            case 14: return "Sion"; break;
            case 1: return "Annie"; break;
            case 202: return "Jhin"; break;
            case 43: return "Karma"; break;
            case 111: return "Nautilus"; break;
            case 240: return "Kled"; break;
            case 99: return "Lux"; break;
            case 103: return "Ahri"; break;
            case 2: return "Olaf"; break;
            case 112: return "Viktor"; break;
            case 34: return "Anivia"; break;
            case 27: return "Singed"; break;
            case 86: return "Garen"; break;
            case 127: return "Lissandra"; break;
            case 57: return "Maokai"; break;
            case 25: return "Morgana"; break;
            case 28: return "Evelynn"; break;
            case 105: return "Fizz"; break;
            case 74: return "Heimerdinger"; break;
            case 238: return "Zed"; break;
            case 68: return "Rumble"; break;
            case 82: return "Mordekaiser"; break;
            case 37: return "Sona"; break;
            case 96: return "KogMaw"; break;
            case 55: return "Katarina"; break;
            case 117: return "Lulu"; break;
            case 22: return "Ashe"; break;
            case 30: return "Karthus"; break;
            case 12: return "Alistar"; break;
            case 122: return "Darius"; break;
            case 67: return "Vayne"; break;
            case 110: return "Varus"; break;
            case 77: return "Udyr"; break;
            case 89: return "Leona"; break;
            case 126: return "Jayce"; break;
            case 134: return "Syndra"; break;
            case 80: return "Pantheon"; break;
            case 92: return "Riven"; break;
            case 121: return "Khazix"; break;
            case 42: return "Corki"; break;
            case 268: return "Azir"; break;
            case 51: return "Caitlyn"; break;
            case 76: return "Nidalee"; break;
            case 85: return "Kennen"; break;
            case 3: return "Galio"; break;
            case 45: return "Veigar"; break;
            case 432: return "Bard"; break;
            case 150: return "Gnar"; break;
            case 90: return "Malzahar"; break;
            case 104: return "Graves"; break;
            case 254: return "Vi"; break;
            case 10: return "Kayle"; break;
            case 39: return "Irelia"; break;
            case 64: return "LeeSin"; break;
            case 420: return "Illaoi"; break;
            case 60: return "Elise"; break;
            case 106: return "Volibear"; break;
            case 20: return "Nunu"; break;
            case 4: return "TwistedFate"; break;
            case 24: return "Jax"; break;
            case 102: return "Shyvana"; break;
            case 429: return "Kalista"; break;
            case 36: return "DrMundo"; break;
            case 427: return "Ivern"; break;
            case 131: return "Diana"; break;
            case 223: return "TahmKench"; break;
            case 63: return "Brand"; break;
            case 113: return "Sejuani"; break;
            case 8: return "Vladimir"; break;
            case 154: return "Zac"; break;
            case 421: return "RekSai"; break;
            case 133: return "Quinn"; break;
            case 84: return "Akali"; break;
            case 163: return "Taliyah"; break;
            case 18: return "Tristana"; break;
            case 120: return "Hecarim"; break;
            case 15: return "Sivir"; break;
            case 236: return "Lucian"; break;
            case 107: return "Rengar"; break;
            case 19: return "Warwick"; break;
            case 72: return "Skarner"; break;
            case 54: return "Malphite"; break;
            case 157: return "Yasuo"; break;
            case 101: return "Xerath"; break;
            case 17: return "Teemo"; break;
            case 75: return "Nasus"; break;
            case 58: return "Renekton"; break;
            case 119: return "Draven"; break;
            case 35: return "Shaco"; break;
            case 50: return "Swain"; break;
            case 91: return "Talon"; break;
            case 40: return "Janna"; break;
            case 115: return "Ziggs"; break;
            case 245: return "Ekko"; break;
            case 61: return "Orianna"; break;
            case 114: return "Fiora"; break;
            case 9: return "Fiddlesticks"; break;
            case 31: return "Chogath"; break;
            case 33: return "Rammus"; break;
            case 7: return "Leblanc"; break;
            case 16: return "Soraka"; break;
            case 26: return "Zilean"; break;
            case 56: return "Nocturne"; break;
            case 222: return "Jinx"; break;
            case 83: return "Yorick"; break;
            case 6: return "Urgot"; break;
            case 203: return "Kindred"; break;
            case 21: return "MissFortune"; break;
            case 62: return "MonkeyKing"; break;
            case 53: return "Blitzcrank"; break;
            case 98: return "Shen"; break;
            case 201: return "Braum"; break;
            case 5: return "XinZhao"; break;
            case 29: return "Twitch"; break;
            case 11: return "MasterYi"; break;
            case 44: return "Taric"; break;
            case 32: return "Amumu"; break;
            case 41: return "Gangplank"; break;
            case 48: return "Trundle"; break;
            case 38: return "Kassadin"; break;
            case 161: return "VelKoz"; break;
            case 143: return "Zyra"; break;
            case 267: return "Nami"; break;
            case 59: return "JarvanIV"; break;
            case 81: return "Ezreal"; break;
            case 145: return "Kaisa"; break;
            case 142: return "Zoe"; break;
            case 517: return "Sylas"; break;
            case 518: return "Neeko"; break;
            case 555: return "Pyke"; break;
            case 516: return "Ornn"; break;
            case 164: return "Camille"; break;
            case 497: return "Rakan"; break;
            case 498: return "Xayah"; break;
            case 141: return "Kayn"; break;
            case 350: return "Yuumi"; break;
        }
  };
}
