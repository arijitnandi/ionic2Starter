import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import {TournamentsPage} from "../pages/tournaments/tournaments";
import {TeamsPage} from "../pages/teams/teams"
import {MyTeamPage} from "../pages/my-team/my-team";
import {EliteApiService} from "./shared/elite-api.service";


@Component({
  templateUrl: 'app.html',
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = MyTeamPage;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Tournaments', component: TournamentsPage },
      { title: 'Teams', component: TeamsPage }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleBlackTranslucent();
      Splashscreen.hide();
    });
  }

  goHome(){
    this.nav.popToRoot();
  }
  goToTournamentsPage(){
    this.nav.push(TournamentsPage);
  }
}
