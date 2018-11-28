import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';

@Injectable()
export class ApiService {
  serverUrl: string = 'http://localhost:8888?search=';

  constructor(private httpClient: HttpClient) { }

  getRandomCity() {
    // ADD responseType 'text' to fix bug
    // https://github.com/angular/angular/issues/18396#issuecomment-337137624
    return this.httpClient.get(this.serverUrl, {responseType: 'text'});
  }

  addCity(data) {
    return this.httpClient.post(this.serverUrl, data,{responseType: 'text'});
  }
}
