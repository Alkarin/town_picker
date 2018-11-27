import { Component } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import {SearchService} from "./search.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [SearchService]
})
export class AppComponent {
  results: Object;
  resultValues: Object;
  searchTerm$ = new Subject<string>();
  currentYear = new Date().getFullYear();

  constructor(private searchService: SearchService) {

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
}
