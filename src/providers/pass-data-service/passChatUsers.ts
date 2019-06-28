import { Injectable } from '@angular/core';
import {ChatUsersPass} from "../../models/chatUsersPass";


@Injectable()
export class PassChatUsers {

    chatUsers: ChatUsersPass = new ChatUsersPass();

    constructor() { }

    public setData(data: ChatUsersPass){
        this.chatUsers = data;
    }

    public getData(){
        return this.chatUsers;
    }
}