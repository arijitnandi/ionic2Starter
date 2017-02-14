import { Component } from '@angular/core';
import {NavController, NavParams, ToastController, LoadingController} from 'ionic-angular';
import {TournamentsPage} from "../tournaments/tournaments";
import {TeamHomePage} from "../team-home/team-home";
import {EliteApiService} from "../../app/shared/elite-api.service";

/*
  Generated class for the MyTeam page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-my-team',
  templateUrl: 'my-team.html'
})
export class MyTeamPage {
  // favourites = null;
  favourites : any[] = [
    {
      team : {id: 812, name: 'Baltimore Stars', coach : 'James'},
      tournamentId : '3dd50aaf-6b03-4497-b074-d81703f07ee8',
      tournamentName : 'Cager Classic'
    },
    {
      team : {id: 839, name: 'Baltimore Supreme', coach : 'Miller'},
      tournamentId : '46ebd526-8839-476a-9ba0-8a9b2c07f3c3',
      tournamentName : 'Summer Showdown'
    }
  ];
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public toastCtrl: ToastController,
              private loadingCtrl : LoadingController,
              private eliteApiService : EliteApiService) {
    //this.presentToast();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyTeamPage');
  }

  goToTournamentsPage(){
    this.navCtrl.push(TournamentsPage);
  }

  presentToast() {
    let toast = this.toastCtrl.create({
      message: 'User was added successfully',
      duration: 3000,
      position: 'bottom'
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }

  favouriteTapped($event, favTeam){
    let loader = this.loadingCtrl.create({
      content: "Getting Data...",
      dismissOnPageChange: true
    });
    loader.present();
    this.eliteApiService.getTournamentDetails(favTeam.tournamentId)
      .subscribe(tourney => {
        let favTeamwithData = tourney.teams.find(_team => _team.id === favTeam.team.id);
        this.navCtrl.push(TeamHomePage,favTeamwithData);
      });
  }
}
