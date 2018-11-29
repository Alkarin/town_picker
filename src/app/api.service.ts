import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';

@Injectable()
export class ApiService {
  serverUrl: string = 'http://localhost:8888';
  googleMapsApiKey: string = 'AIzaSyDRJzBoqP-HPbiQMjwUHDAocVsFGRp2IAw';
  googleMapsApiUrl: string = 'https://maps.googleapis.com/maps/api/timezone/json?location=';

  constructor(private httpClient: HttpClient) { }

  getCities() {
    return this.httpClient.get(this.serverUrl + '/cities.php' , {responseType: 'text'});
  }

  getRandomCity() {
    // ADD responseType 'text' to fix bug
    // https://github.com/angular/angular/issues/18396#issuecomment-337137624
    return this.httpClient.get(this.serverUrl + '/randomCity.php', {responseType: 'text'});
  }

  // getTimeZoneOffSet() {
  //   return this.httpClient.get(this.serverUrl + '/getOffset.php' , {responseType: 'text'});
  // }

  addCity(data) {
    return this.httpClient.post(this.serverUrl + '/addCity.php/?data=', data, {responseType: 'text'});
  }

  getGoogleMapsTimeZone(latitude, longitude) {
    // CALL TO GOOGLE MAPS API
    return this.httpClient.get(this.googleMapsApiUrl + latitude.toString() + ',' + longitude.toString() + '&timestamp=1458000000&key=' + this.googleMapsApiKey);
  }
}
