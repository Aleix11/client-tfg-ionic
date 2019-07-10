import { Injectable } from '@angular/core';

@Injectable()
export class PassWalletService {

    wallet: any;

    constructor() { }

    public setWallet(data: any){
        this.wallet = data;
    }

    public getWallet(){
        return this.wallet;
    }
}