import { Component, OnInit } from '@angular/core';
import {ApiService} from '../api.service';

@Component({
  selector: 'app-towns',
  templateUrl: './towns.component.html',
  styleUrls: ['./towns.component.scss']
})
export class TownsComponent implements OnInit {
  randomSelected: boolean

  constructor(private apiService: ApiService) { }

  ngOnInit() {
  }

  randomize() {
    // Do Stuff
    this.apiService.getRandomCity().subscribe(
      (response) => this.handleSuccess(response),
      (error) => this.handleFailure(error)
    );

    this.randomSelected = true;
  }

  private handleSuccess(response) {
    console.log(response);
  }

  private handleFailure(error) {
    console.log(error);
  }

  checkRandomSelected () {
    if (this.randomSelected) {
      return 'show-page';
    } else {
      return 'hide-page';
    }
  }

}
