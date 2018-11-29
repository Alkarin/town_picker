import { Component } from '@angular/core';
import {ApiService} from './api.service';
import {AnimationDirection} from './models/animation-direction.enum';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [ApiService]
})
export class AppComponent {
  results: Object;
  resultValues: Object;
  currentYear = new Date().getFullYear();
  currentPage: number;
  animationDirection: AnimationDirection.NONE;

  constructor() {
    this.currentPage = 1;
  }

  private handleResponse(response) {
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

  private handleResponseError(error) {
    console.log('ERROR:' + JSON.stringify(error));
  }

  toggleDisplay(pageNum) {
    if (pageNum === this.currentPage) {
      if (this.animationDirection === AnimationDirection.NONE) {
        return 'show-page';
      } else if (this.animationDirection === AnimationDirection.LEFT) {
        return 'show-page animate-left';
      } else if (this.animationDirection === AnimationDirection.RIGHT) {
        return 'show-page animate-right';
      }
    } else {
      return 'hide-page';
    }
  }

  onNotify($event) {
    this.currentPage = $event.currentPage;
    this.animationDirection = $event.animationDirection;
  }
}
