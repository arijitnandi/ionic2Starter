import {Component, OnInit} from '@angular/core';
import {NavController, NavParams, LoadingController} from 'ionic-angular';
import {TeamsPage} from "../teams/teams";
import {MyTeamPage} from "../my-team/my-team";
import {EliteApiService} from "../../app/shared/elite-api.service";
import * as _ from "lodash";

/*
  Generated class for the Tournaments page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-tournaments',
  templateUrl: 'tournaments.html'
})
export class TournamentsPage implements OnInit{

  tournaments : any;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private eliteApiService : EliteApiService,
              private loadingController : LoadingController) {}

  ionViewDidLoad() {
    console.log(_.partition([1, 2, 3, 4], n => n % 2));
    console.log('ionViewDidLoad TournamentsPage');
  }

  itemTapped($event, tournament){
    this.navCtrl.push(TeamsPage,tournament);
  }

  ngOnInit(): void {

    let loader = this.loadingController.create({
      content: 'Getting Tournaments...'
    });

    loader.present().then(() => {
      this.eliteApiService.getTournaments()
        .subscribe(tournaments => {
          this.tournaments = tournaments;
          loader.dismiss();
        });
      //loader.dismiss();
    });
  }
}
