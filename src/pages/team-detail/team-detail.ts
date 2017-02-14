import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {StandingsPage} from "../standings/standings";
import {EliteApiService} from "../../app/shared/elite-api.service";
import * as _ from 'lodash';
import {GamePage} from "../game/game";
import * as moment from "moment";

/*
  Generated class for the TeamDetail page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-team-detail',
  templateUrl: 'team-detail.html'
})
export class TeamDetailPage {
  dateFilter : String;
  allGames : any[];
  games : any;
  team : any;
  teamStanding : any ={};
  private tourneyData : any;
  useDateFilter : boolean= false;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private eliteApiService : EliteApiService)
  {
    this.team = navParams.data;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TeamDetailPage');
    this.tourneyData = this.eliteApiService.getCurrentTourney();

    this.games = _.chain(this.tourneyData.games)
                  .filter(game => game.team1Id === this.team.id || game.team2Id === this.team.id)
                  .map(game => {
                    let isTeam1 = (game.team1Id === this.team.id);
                    let opponentName = isTeam1 ? game.team2 : game.team1;
                    let scoreDisplay = this.getScoreDisplay(isTeam1, game.team1Score,game.team2Score);
                    return{
                      gameId:game.id,
                      opponent: opponentName,
                      time: Date.parse(game.time),
                      location: game.location,
                      scoreDisplay : scoreDisplay,
                      homeAway : (isTeam1 ? "vs": "at")

                    }
                  })
                  .value();

    this.teamStanding = _.find(this.tourneyData.standings, {teamId : this.team.id});
    this.allGames = this.games;
    console.log(this.games);
  }

  getScoreDisplay(isTeam1, team1Score, team2Score){
    if(team1Score && team2Score){
      let teamScore = (isTeam1 ? team1Score : team2Score);
      let opponentScore = (isTeam1 ? team2Score : team1Score);
      let winIndicator = teamScore > opponentScore ? "W" : "L";
      return `${winIndicator} ${teamScore} - ${opponentScore}`;
    }
    else{
      return "";
    }
  }

  gameClicked($event,game){
    let gameSource = this.tourneyData.games.find(_game => _game.id === game.gameId);
    this.navCtrl.parent.parent.push(GamePage,gameSource);
  }
  getScoreWorL(game){
    return game.scoreDisplay ? game.scoreDisplay[0] : '';
  }
  dateChanged(){
    if(this.useDateFilter){
      this.games = _.filter(this.allGames, g=> moment(g.time).isSame(this.dateFilter,'day'));
    }
    else{
      this.games = this.allGames;
    }
  }
  getScoreDisplayBadgeClass(game){
    return game.scoreDisplay.indexOf('W') === 0 ? 'badge-ios-secondary' : 'badge-ios-danger';
  }

}
