import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';

@Injectable()
export class SearchService {
  serverUrl: string = 'http://localhost:8888?search=';

  constructor(private httpClient: HttpClient) { }

  search(terms: Observable<string>) {
    // Add buffer on amount of calls to make
    return terms.debounceTime(400)
      .distinctUntilChanged()
      .switchMap(term => this.searchEntries(term));
  }

  searchEntries(term) {
    return this.httpClient.get(this.serverUrl + term);
  }
}
