import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {TeamDetailPage} from "../team-detail/team-detail";
import {StandingsPage} from "../standings/standings";

/*
  Generated class for the TeamHome page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-team-home',
  templateUrl: 'team-home.html'
})
export class TeamHomePage {

  team: any;
  teamDetailTab = TeamDetailPage;
  teamStandingTab = StandingsPage;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.team = navParams.data;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TeamHomePage');
  }
  goToHome(){
    this.navCtrl.popToRoot();
  }
}
