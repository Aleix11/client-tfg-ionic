import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {UserService} from "../providers/userService";
import {HttpClientModule} from "@angular/common/http";
import {PassUserService} from "../providers/pass-data-service/passUserService";
import {IonicStorageModule} from '@ionic/storage';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {SummonerService} from "../providers/summonerService";
import {BetService} from "../providers/betService";
import {PassFiltersService} from "../providers/pass-data-service/passFiltersService";
import {ChartsModule} from "ng2-charts";

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule,
      IonicModule.forRoot(),
      IonicStorageModule.forRoot(),
      HttpClientModule,
      AppRoutingModule,
      BrowserAnimationsModule,
      ChartsModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    UserService,
    PassUserService,
    SummonerService,
    BetService,
    PassFiltersService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
