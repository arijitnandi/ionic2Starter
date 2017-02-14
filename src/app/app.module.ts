import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { Page1 } from '../pages/page1/page1';
import { Page2 } from '../pages/page2/page2';
import {TournamentsPage} from "../pages/tournaments/tournaments";
import {TeamsPage} from "../pages/teams/teams";
import {TeamDetailPage} from "../pages/team-detail/team-detail";
import {GamePage} from "../pages/game/game";
import {MyTeamPage} from "../pages/my-team/my-team";
import {StandingsPage} from "../pages/standings/standings";
import {TeamHomePage} from "../pages/team-home/team-home";
import {HttpModule} from "@angular/http";
import {EliteApiService} from "./shared/elite-api.service";
import "./shared/rxjs-extensions";

@NgModule({
  declarations: [
    MyApp,
    TournamentsPage,
    TeamsPage,
    TeamDetailPage,
    GamePage,
    MyTeamPage,
    StandingsPage,
    TeamHomePage
  ],
  imports: [
    IonicModule.forRoot(MyApp),HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TournamentsPage,
    TeamsPage,
    TeamDetailPage,
    GamePage,
    MyTeamPage,
    StandingsPage,
    TeamHomePage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler},EliteApiService]
})
export class AppModule {}
