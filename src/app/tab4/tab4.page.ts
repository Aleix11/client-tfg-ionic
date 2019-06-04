import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {

  searchUser: string;
  segment: string = "bets";
  constructor() { }

  ngOnInit() {
  }

  segmentChanged(event) {
    if(event.detail.value === "users") {
      this.segment = "users";
    } else {
      this.segment = "bets";
    }
  }
}
