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
    console.log('getting cities');
    return this.httpClient.get(this.serverUrl + '/cities.php');
  }

  getRandomCity() {
    return this.httpClient.get(this.serverUrl + '/randomCity.php');
  }

  addCity(data: any[]) {
    return this.httpClient.post(this.serverUrl + '/addCity.php', data, {responseType: 'text'});
  }

  getGoogleMapsTimeZone(latitude, longitude) {
    // CALL TO GOOGLE MAPS API
    return this.httpClient.get(this.googleMapsApiUrl + latitude.toString()
      + ',' + longitude.toString() + '&timestamp=1458000000&key=' + this.googleMapsApiKey);
  }
}
