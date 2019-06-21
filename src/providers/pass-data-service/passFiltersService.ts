import { Injectable } from '@angular/core';
import {Filters} from "../../models/filters";


@Injectable()
export class PassFiltersService {

    filters: Filters = new Filters();

    constructor() { }

    public setFilters(data: Filters){
        this.filters = data;
    }

    public getFilters(){
        return this.filters;
    }
}