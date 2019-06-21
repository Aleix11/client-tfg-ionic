import { Injectable } from '@angular/core';
import {User} from "../../models/user";


@Injectable()
export class PassUserService {

    user: User = new User();

    constructor() { }

    public setUser(data: User){
        this.user = data;
    }

    public getUser(){
        return this.user;
    }
}