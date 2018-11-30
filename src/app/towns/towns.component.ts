import {Component, OnInit} from '@angular/core';
import {ApiService} from '../api.service';
import {TownsService} from '../towns.service';
import {Town} from '../models/town';

@Component({
  selector: 'app-towns',
  templateUrl: './towns.component.html',
  styleUrls: ['./towns.component.scss']
})
export class TownsComponent implements OnInit {
  randomSelected: boolean;
  currentRandom = new Town();
  showRandom: boolean;
  results: Object;
  resultValues: Object;

  constructor(private apiService: ApiService, private townsService: TownsService) {
  }

  ngOnInit() {
    this.townsService.activated.subscribe(
      (id: number) => {
        console.log('Observable activated in towns');
        this.apiService.getTowns().subscribe(
          (response) => this.handleTownsSuccess(response),
          (error) => this.handleTownsFailure(error)
        );
      }
    );
  }

  randomize() {
    this.apiService.getRandomTown().subscribe(
      (response) => this.handleRandomizeSuccess(response),
      (error) => this.handleRandomizeFailure(error)
    );
    this.randomSelected = true;
  }

  showRandomButton() {
    if (this.showRandom) {
       return 'show-page';
    } else {
      return 'hide-page';
    }
  }

  getCurrentTown(param) {
    if (this.currentRandom === null) {
      return '';
    } else {
      switch (param) {
        case 'townName': {
          return this.currentRandom.townName;
        }
        case 'townState': {
          return this.currentRandom.townState;
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

  private getDateFromTimeZone(offset) {
    let offsetDate = new Date( new Date().getTime() + offset * 3600 * 1000).toUTCString().replace( / GMT$/, '' );
    return offsetDate;
  }

  private handleTownsSuccess(response) {
    if (JSON.stringify(response) === '\"No Results\"') {
      console.log('There were no results');

      // Clear Search Results
      this.results = null;
      this.resultValues = null;
    } else {
      this.results = Object.keys(response);
      this.resultValues = Object.values(response);

      // INITIALIZE showRandom
      if (Object.keys(this.results).length >= 3) {
        this.showRandom = true;
      } else {
        this.showRandom = false;
      }
    }
  }

  private handleTownsFailure(error) {
    console.log('error handling towns');
    console.log(error);
  }

  private handleRandomizeSuccess(response) {
    this.currentRandom.setTownName(response.townName);
    this.currentRandom.setTownState(response.townState);
    this.currentRandom.setTimeZoneOffset(response.timezoneOffset);
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
