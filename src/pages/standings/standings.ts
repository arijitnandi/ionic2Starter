import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import * as _ from "lodash";
import {EliteApiService} from "../../app/shared/elite-api.service";

/*
  Generated class for the Standings page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-standings',
  templateUrl: 'standings.html'
})
export class StandingsPage {
  team:any;
  standings:any[];
  allStandings: any[];

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private eliteApiService : EliteApiService) {
    this.team = navParams.data;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StandingsPage');
    let tourneyData = this.eliteApiService.getCurrentTourney();
    this.standings = tourneyData.standings;
    this.allStandings =
      _.chain(this.standings)
        .groupBy("division")
        .toPairs()
        .map(item => _.zipObject(['divisionName','divisionStandings'], item))
        .value();
    console.log(this.standings);
    console.log(this.allStandings);
    this.standings = this.allStandings;
  }

}
