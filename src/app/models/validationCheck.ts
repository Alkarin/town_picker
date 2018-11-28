export class ValidationCheck {
  isValid: boolean;
  hasLocality: boolean;
  hasState: boolean;

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

}
