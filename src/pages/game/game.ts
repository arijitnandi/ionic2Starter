import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {EliteApiService} from "../../app/shared/elite-api.service";
import {TeamHomePage} from "../team-home/team-home";

/*
  Generated class for the Game page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-game',
  templateUrl: 'game.html'
})
export class GamePage {

  game: any;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private eliteAPiService: EliteApiService) {
    this.game = this.navParams.data;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GamePage');
  }

  teamTapped(teamId){
    let tourneyData = this.eliteAPiService.getCurrentTourney();
    let tappedTeam = tourneyData.teams.find(_team => _team.id === teamId);
    this.navCtrl.push(TeamHomePage,tappedTeam);
  }
}
