import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs/index";
import {Bet} from "../models/bet";

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class BetService {

    // URL to web api
    private betsUrl: string = 'http://localhost:3000/bets';

    constructor(public http: HttpClient) {
    }

    bet(bet, tkn): Observable<any> {
        httpOptions.headers = httpOptions.headers.delete("Authorization");
        httpOptions.headers = httpOptions.headers.append("Authorization", tkn);
        return this.http.post<any>(`${this.betsUrl}/create`, bet, httpOptions);
    }

    getPendingBets(filters, tkn) : Observable<Bet[]> {
        httpOptions.headers = httpOptions.headers.delete("Authorization");
        httpOptions.headers = httpOptions.headers.append("Authorization", tkn);
        return this.http.post<Bet[]>(`${this.betsUrl}/pendingBets`, filters, httpOptions);
    }

    getBet(betId, tkn) : Observable<any> {
        httpOptions.headers = httpOptions.headers.delete("Authorization");
        httpOptions.headers = httpOptions.headers.append("Authorization", tkn);
        return this.http.post<any>(`${this.betsUrl}/getBet`, betId, httpOptions);
    }

    acceptBet(bet, tkn): Observable<any> {
        httpOptions.headers = httpOptions.headers.delete("Authorization");
        httpOptions.headers = httpOptions.headers.append("Authorization", tkn);
        return this.http.post<any>(`${this.betsUrl}/accept`, bet, httpOptions);
    }

    getBetsFromUser(user, tkn) : Observable<any> {
        httpOptions.headers = httpOptions.headers.delete("Authorization");
        httpOptions.headers = httpOptions.headers.append("Authorization", tkn);
        return this.http.post<any>(`${this.betsUrl}/getBetsFromUser`, { user: user}, httpOptions);
    }
}