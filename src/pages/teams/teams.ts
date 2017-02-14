import {Component, OnInit} from '@angular/core';
import {NavController, NavParams, LoadingController} from 'ionic-angular';
import {TeamDetailPage} from "../team-detail/team-detail";
import {TeamHomePage} from "../team-home/team-home";
import {EliteApiService} from "../../app/shared/elite-api.service";
import * as _ from "lodash";

/*
  Generated class for the Teams page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-teams',
  templateUrl: 'teams.html'
})
export class TeamsPage implements OnInit{

  tournament : any;
  teams: any[];
  private allTeams: any;
  private allTeamDivisions: any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private loadingController : LoadingController,
              private eliteApiService : EliteApiService) {
    this.tournament = navParams.data;
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad TeamsPage');
  }

  itemTapped($event,team){
    this.navCtrl.push(TeamHomePage,team);
  }
  getAllTeamsForTournamnet(){
    let loader = this.loadingController.create({
      content: '<b>Fetching Teams...</b>'
    });
    loader.present().then(() => {
      this.eliteApiService.getTournamentDetails(this.tournament.id)
        .subscribe(tournament => {
          this.allTeams = tournament.teams;
          this.allTeamDivisions =
            _.chain(tournament.teams)
            .groupBy("division")
              .toPairs()
              .map(item => _.zipObject(['divisionName','divisionTeams'],item))
              .value();
          this.teams = this.allTeamDivisions;
          console.log('division team',this.teams);
          loader.dismiss();
        });
    })
  }

  ngOnInit(): void {
    this.getAllTeamsForTournamnet();
  }
}
