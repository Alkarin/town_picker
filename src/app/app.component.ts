import { Component } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import {SearchService} from './search.service';
import {AnimationDirection} from './models/animation-direction.enum';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [SearchService]
})
export class AppComponent {
  results: Object;
  resultValues: Object;
  searchTerm$ = new Subject<string>();
  currentYear = new Date().getFullYear();
  currentPage: number;
  animationDirection: AnimationDirection.NONE;

  constructor(private searchService: SearchService) {

    this.currentPage = 1;

    this.searchService.search(this.searchTerm$).subscribe(
      (response) => this.handleResponse(response),
      (error) => this.handleResponseError(error)
    );
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
      console.log(pageNum);
      console.log(this.currentPage);
      if (this.animationDirection === AnimationDirection.NONE) {
        return 'show-page';
      } else if (this.animationDirection === AnimationDirection.LEFT) {
        return 'show-page animate-left';
      } else if (this.animationDirection === AnimationDirection.RIGHT) {
        return 'show-page animate-right';
      } else {
        // Return from finished page
        return 'show-page animate-left';
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
