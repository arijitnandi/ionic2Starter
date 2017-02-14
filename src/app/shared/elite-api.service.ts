import {Injectable} from "@angular/core";
import {Http, Response} from "@angular/http";
import {CONFIG} from "./config";

@Injectable()
export class EliteApiService{
  private currentTourney : any = {};
  constructor(private _http : Http){}

  getTournaments(){
    return this._http.get(CONFIG.URL.allTournaments)
      .map((response : Response) => response.json());
  }

  getTournamentDetails(tournamentId : any){
    return this._http.get(`${CONFIG.URL.tournamnetDetailBase}/${tournamentId}.json`)
      .map((response : Response) => {
        this.currentTourney = response.json();
        return this.currentTourney;
      });
  }

  getCurrentTourney(){
    return this.currentTourney;
  }
}
