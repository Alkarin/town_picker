import {Component, OnInit} from '@angular/core';
import {ApiService} from '../api.service';
import {TownsService} from '../towns.service';
import {City} from '../models/city';

@Component({
  selector: 'app-towns',
  templateUrl: './towns.component.html',
  styleUrls: ['./towns.component.scss']
})
export class TownsComponent implements OnInit {
  randomSelected: boolean;
  currentRandom = new City();
  results: Object;
  resultValues: Object;

  constructor(private apiService: ApiService, private townsService: TownsService) {
    this.apiService.getCities().subscribe(
      (response) => this.handleCitiesSuccess(response),
      (error) => this.handleCitiesizeFailure(error)
    );
  }

  ngOnInit() {
    this.townsService.activated.subscribe(
      (id: number) => {
        console.log('Observable activated in towns');
        this.apiService.getCities().subscribe(
          (response) => this.handleCitiesSuccess(response),
          (error) => this.handleCitiesizeFailure(error)
        );
      }
    );
  }

  randomize() {
    // Do Stuff
    this.apiService.getRandomCity().subscribe(
      (response) => this.handleRandomizeSuccess(response),
      (error) => this.handleRandomizeFailure(error)
    );

    this.randomSelected = true;
  }

  getCurrentCity(param) {
    if (this.currentRandom === null) {
      return '';
    } else {
      switch (param) {
        case 'cityName': {
          return this.currentRandom.cityName;
        }
        case 'cityState': {
          return this.currentRandom.cityState;
        }
        case 'timezoneOffset': {
          return this.getDateFromTimeZone(this.currentRandom.timezoneOffset);
        }
        default: {
          // Return nothing
          break;
        }
      }
    }
  }

  getDateFromTimeZone(offset) {
    let offsetDate = new Date( new Date().getTime() + offset * 3600 * 1000).toUTCString().replace( / GMT$/, '' );
    return offsetDate;
  }

  private handleCitiesSuccess(response) {
    console.log('handling cities');
    console.log(response);

    if (JSON.stringify(response) === '\"No Results\"') {
      console.log('There were no results');

      // Clear Search Results
      this.results = null;
      this.resultValues = null;
    } else {
      // console.log('Response: ' + JSON.stringify(response));
      this.results = Object.keys(response);
      this.resultValues = Object.values(response);
      console.log('results:');
      console.log(this.results);
      console.log(this.resultValues);
    }
  }

  private handleCitiesizeFailure(error) {
    console.log('error handling cities');
    console.log(error);
  }

  private handleRandomizeSuccess(response) {
    this.currentRandom.setCityName(response.cityName);
    this.currentRandom.setCityName(response.cityState);
    this.currentRandom.setTimeZoneOffset(response.timezoneOffset);
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
