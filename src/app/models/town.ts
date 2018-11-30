export class Town {
  townName: String;
  townState: String;
  latitude: number;
  longitude: number;
  timezoneOffset: number;

  constructor () {}

  setTownName(townName) {
    this.townName = townName;
  }

  setTownState(townState) {
    this.townState = townState;
  }

  setLatitude (latitude) {
    this.latitude = latitude;
  }

  setLongitude(longitude) {
    this.longitude = longitude;
  }

  setTimeZoneOffset(timezoneOffset) {
    this.timezoneOffset = timezoneOffset;
  }
}
