import { Component, OnInit } from '@angular/core';
import {ApiService} from '../api.service';

@Component({
  selector: 'app-towns',
  templateUrl: './towns.component.html',
  styleUrls: ['./towns.component.scss']
})
export class TownsComponent implements OnInit {
  randomSelected: boolean;
  results: Object;
  resultValues: Object;

  constructor(private apiService: ApiService) {
    this.apiService.getCities().subscribe(
      (response) => this.handleCitiesSuccess(response),
      (error) => this.handleCitiesizeFailure(error)
    );
  }

  ngOnInit() {
  }

  randomize() {
    // Do Stuff
    this.apiService.getRandomCity().subscribe(
      (response) => this.handleRandomizeSuccess(response),
      (error) => this.handleRandomizeFailure(error)
    );

    this.randomSelected = true;
  }

  getDateFromTimeZone(offset) {
    console.log(offset);
    let currentDate = new Date();
    console.log('current Date: ' + currentDate);
    let offsetDate = new Date( new Date().getTime() + offset * 3600 * 1000).toUTCString().replace( / GMT$/, '' );
    console.log(offsetDate);
    return offsetDate;
  }

  private handleCitiesSuccess(response) {
    console.log(response);

    if (JSON.stringify(response) === '\"No Results\"') {
      // console.log("There were no results");

      // Clear Search Results
      this.results = null;
      this.resultValues = null;
    } else {
      // console.log("RESPONSE:" + JSON.stringify(response));
      this.results = Object.keys(response);
      this.resultValues = Object.values(response);
    }
  }

  private handleCitiesizeFailure(error) {
    console.log(error);
  }

  private handleRandomizeSuccess(response) {
    console.log(response);
  }

  private handleRandomizeFailure(error) {
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
