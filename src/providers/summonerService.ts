import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs/index";

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class SummonerService {

    // URL to web api
    private summonersUrl: string = 'http://localhost:3000/summoners';

    constructor(public http: HttpClient) {
    }

    searchSummoner(summoner, tkn): Observable<any> {
        httpOptions.headers = httpOptions.headers.delete("Authorization");
        httpOptions.headers = httpOptions.headers.append("Authorization", tkn);
        return this.http.post<any>(`${this.summonersUrl}/searchSummoner`, summoner, httpOptions);
    }

    searchSummonerInfo(summoner, tkn): Observable<any> {
        httpOptions.headers = httpOptions.headers.delete("Authorization");
        httpOptions.headers = httpOptions.headers.append("Authorization", tkn);
        return this.http.post<any>(`${this.summonersUrl}/searchSummonerInfo`, summoner, httpOptions);
    }
}