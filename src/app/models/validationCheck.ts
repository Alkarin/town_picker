export class ValidationCheck {
  isValid: boolean;
  hasCountry: boolean;
  hasLocality: boolean;
  hasState: boolean;
  hasTimeZone: boolean;

  constructor() {
    this.isValid = false;
    this.hasLocality = false;
    this.hasState = false;
  }

  setIsValid (isValid) {
    this.isValid = isValid;
  }

  setHasLocality (hasLocality) {
    this.hasLocality = hasLocality;
  }

  setHasState (hasState) {
    this.hasState = hasState;
  }

  setHasTimeZone (hasTimeZone) {
    this.hasTimeZone = hasTimeZone;
  }

  setHasCountry (hasCountry) {
    this.hasCountry = hasCountry;
  }

}
