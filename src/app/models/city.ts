export class City {
  cityName: String;
  cityState: String;
  latitude: number;
  longitude: number;

  constructor () {}

  setCityName(cityName) {
    this.cityName = cityName;
  }

  setCityState(cityState) {
    this.cityState = cityState;
  }

  setLatitude (latitude) {
    this.latitude = latitude;
  }

  setLongitude(longitude) {
    this.longitude = longitude;
  }
}
