import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs/index";
import {Chat} from "../models/chat";

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class ChatService {

    // URL to web api
    private chatsUrl: string = 'http://localhost:3000/chats';

    constructor(public http: HttpClient) {
    }

    getChats(user, tkn) : Observable<any> {
        httpOptions.headers = httpOptions.headers.delete("Authorization");
        httpOptions.headers = httpOptions.headers.append("Authorization", tkn);
        return this.http.post<any>(`${this.chatsUrl}/getChats`, user, httpOptions);
    }

    getChatRoom(users, tkn) : Observable<any> {
        httpOptions.headers = httpOptions.headers.delete("Authorization");
        httpOptions.headers = httpOptions.headers.append("Authorization", tkn);
        return this.http.post<any>(`${this.chatsUrl}/getRoom`, users, httpOptions);
    }

    getChatRoomById(room, tkn) : Observable<any> {
        httpOptions.headers = httpOptions.headers.delete("Authorization");
        httpOptions.headers = httpOptions.headers.append("Authorization", tkn);
        return this.http.post<any>(`${this.chatsUrl}/getRoomById`, {room: room}, httpOptions);
    }

    getMessages(room, tkn) : Observable<any> {
        httpOptions.headers = httpOptions.headers.delete("Authorization");
        httpOptions.headers = httpOptions.headers.append("Authorization", tkn);
        return this.http.post<any>(`${this.chatsUrl}/getMessages`, room, httpOptions);
    }

    lastView(user, tkn) : Observable<any> {
        httpOptions.headers = httpOptions.headers.delete("Authorization");
        httpOptions.headers = httpOptions.headers.append("Authorization", tkn);
        return this.http.post<any>(`${this.chatsUrl}/lastView`, user, httpOptions);
    }

    createChat(from, to, tkn) : Observable<any> {
        let users = {
            userFrom: from,
            userTo: to
        };
        httpOptions.headers = httpOptions.headers.delete("Authorization");
        httpOptions.headers = httpOptions.headers.append("Authorization", tkn);
        return this.http.post<any>(`${this.chatsUrl}/newChat`, users, httpOptions);
    }

    getMessagesNotSeen(user, tkn) : Observable<any> {
        httpOptions.headers = httpOptions.headers.delete("Authorization");
        httpOptions.headers = httpOptions.headers.append("Authorization", tkn);
        return this.http.post<any>(`${this.chatsUrl}/messagesNotSeen`, user, httpOptions);
    }
}