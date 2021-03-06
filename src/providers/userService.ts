import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs/index";
import {User} from "../models/user";

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class UserService {

    // URL to web api
    // private usersUrl: string = 'http://localhost:3000/users';
    private usersUrl: string = 'http://147.83.118.30:3000/users';
    // private usersUrl: string = 'http://192.168.1.48:3000/users';

    constructor(public http: HttpClient) {
    }

    login(user: User): Observable<User> {
        return this.http.post<User>(`${this.usersUrl}/login`, user, httpOptions);
    }

    register(user: User): Observable<User> {
        return this.http.post<User>(`${this.usersUrl}/register`, user, httpOptions);
    }

    createWallet(user: User, tkn): Observable<User> {
        httpOptions.headers = httpOptions.headers.delete("Authorization");
        httpOptions.headers = httpOptions.headers.append("Authorization", tkn);
        return this.http.post<User>(`${this.usersUrl}/createWallet`, user, httpOptions);
    }

    loadWallet(wallet, tkn): Observable<User> {
        httpOptions.headers = httpOptions.headers.delete("Authorization");
        httpOptions.headers = httpOptions.headers.append("Authorization", tkn);
        return this.http.post<User>(`${this.usersUrl}/loadWallet`, wallet, httpOptions);
    }

    searchUser(user, tkn): Observable<User[]> {
        httpOptions.headers = httpOptions.headers.delete("Authorization");
        httpOptions.headers = httpOptions.headers.append("Authorization", tkn);
        return this.http.post<User[]>(`${this.usersUrl}/search`, user, httpOptions);
    }

    addFriend(user, tkn): Observable<User> {
        httpOptions.headers = httpOptions.headers.delete("Authorization");
        httpOptions.headers = httpOptions.headers.append("Authorization", tkn);
        return this.http.post<User>(`${this.usersUrl}/friends/add`, user, httpOptions);
    }

    removeFriend(user, tkn): Observable<User> {
        httpOptions.headers = httpOptions.headers.delete("Authorization");
        httpOptions.headers = httpOptions.headers.append("Authorization", tkn);
        return this.http.post<User>(`${this.usersUrl}/friends/delete`, user, httpOptions);
    }

    getUser(id, tkn): Observable<User> {
        httpOptions.headers = httpOptions.headers.delete("Authorization");
        httpOptions.headers = httpOptions.headers.append("Authorization", tkn);
        return this.http.post<User>(`${this.usersUrl}/getUserFromId`, {user: id}, httpOptions);
    }

    getUserFromUsername(username, tkn): Observable<User> {
        httpOptions.headers = httpOptions.headers.delete("Authorization");
        httpOptions.headers = httpOptions.headers.append("Authorization", tkn);
        return this.http.post<User>(`${this.usersUrl}/getUserFromUsername`, {user: username}, httpOptions);
    }

    editFavouriteSummoner(user, tkn) : Observable<User> {
        httpOptions.headers = httpOptions.headers.delete("Authorization");
        httpOptions.headers = httpOptions.headers.append("Authorization", tkn);
        return this.http.post<User>(`${this.usersUrl}/editFavouriteSummoner`, {user: user}, httpOptions);
    }

    editUser(user, tkn) : Observable<User> {
        httpOptions.headers = httpOptions.headers.delete("Authorization");
        httpOptions.headers = httpOptions.headers.append("Authorization", tkn);
        return this.http.post<User>(`${this.usersUrl}/editUser`, {user: user}, httpOptions);
    }

    getNumberTokens(account, tkn) : Observable<any> {
        httpOptions.headers = httpOptions.headers.delete("Authorization");
        httpOptions.headers = httpOptions.headers.append("Authorization", tkn);
        return this.http.post<any>(`${this.usersUrl}/getNumberTokens`, {account: account}, httpOptions);
    }

    buyTokensPassTokens(buyer, tokens, tkn) : Observable<any> {
        httpOptions.headers = httpOptions.headers.delete("Authorization");
        httpOptions.headers = httpOptions.headers.append("Authorization", tkn);
        return this.http.post<any>(`${this.usersUrl}/buyTokensPassTokens`, {
            buyer: buyer,
            tokens: tokens
        }, httpOptions);
    }

    sellTokensPassEthers(buyer, tokens, tkn) : Observable<any> {
        httpOptions.headers = httpOptions.headers.delete("Authorization");
        httpOptions.headers = httpOptions.headers.append("Authorization", tkn);
        return this.http.post<any>(`${this.usersUrl}/sellTokensPassEthers`, {
            buyer: buyer,
            tokens: tokens
        }, httpOptions);
    }
}
