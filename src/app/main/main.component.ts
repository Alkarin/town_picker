import { Component, OnInit } from '@angular/core';
import {ValidationCheck} from '../models/validationCheck';
import {ApiService} from '../api.service';
import {Town} from '../models/town';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  currentValidation: ValidationCheck;
  currentSelection: Town;
  apiResponseError: boolean;

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.apiResponseError = false;
  }

  autoCompleteCallback1(selectedData: any) {
    // Do things!
    this.parseResponse(selectedData);
  }

  private parseResponse (selectedData) {
    this.currentValidation = new ValidationCheck();
    this.currentSelection = new Town();

    let json = selectedData.data.address_components;
    let geometry = selectedData.data.geometry.location;
    this.currentSelection.setLatitude(geometry.lat);
    this.currentSelection.setLongitude(geometry.lng);

    // console.log(json);
    for (let prop in json) {
      let types = json[prop].types;
      for (let type in types) {
        // console.log(json[prop].types[type]);

        if (json[prop].types[type] === 'country') {
          if (json[prop].long_name === 'United States') {
            this.currentValidation.setHasCountry(true);
          }
        }

        // Check for city value
        if (json[prop].types[type] === 'locality') {
          this.currentValidation.setHasLocality(true);
          this.currentSelection.setTownName(json[prop].long_name);
        }

        // Check for state value
        if (json[prop].types[type] === 'administrative_area_level_1') {
          this.currentValidation.setHasState(true);
          this.currentSelection.setTownState(json[prop].long_name);
        }
      }
    }
    this.validateResponse(this.currentValidation);
  }

  private validateResponse (currentValidation) {
    console.log(this.currentSelection);
    if (currentValidation.hasLocality && currentValidation.hasState && currentValidation.hasCountry) {
      currentValidation.setIsValid(true);
      console.log('valid!');
    } else {
      console.log('not valid');
      currentValidation.setIsValid(false);
    }
  }

  submitInput() {
    // GET TIMEZONE OFFSET OF INPUT
    this.apiService.getGoogleMapsTimeZone(this.currentSelection.latitude, this.currentSelection.longitude).subscribe(
      (response) => this.handleTimeZoneSuccess(response),
      (error) => function () {
        console.log(error);
      }
    );
  }

  private handleTimeZoneSuccess(response) {
    // Calculate Offset
    if (this.currentValidation.isValid) {
      let offset = (response.rawOffset / 60 / 60);
      this.currentSelection.setTimeZoneOffset(offset);
      this.currentValidation.setHasTimeZone(true);
      this.addTown();
    } else {
      console.log('Failure: Town is not valid');
    }
  }

  private addTown() {
    this.apiService.addTown(this.currentSelection).subscribe(
      (response) => this.handleSuccess(response),
      (error) => this.handleFailure(error)
    );
  }

  private handleSuccess(response) {
    this.apiResponseError = false;
    console.log(response);
  }

  private handleFailure(error) {
    this.apiResponseError = true;
    console.log(error);
  }

  showApiError () {
    if(this.apiResponseError){
      return 'fade-show';
    } else {
      return 'fade-hide';
    }
  }

  checkErrorValidation () {
    try {
      if (this.currentValidation.isValid) {
        return 'fade-hide';
      } else {
        return 'fade-show';
      }
    } catch (e) {
      return 'fade-hide';
    }
  }

  checkSuccessValidation () {
    try {
      if (this.currentValidation.isValid && this.currentValidation.hasTimeZone && !this.apiResponseError) {
        return 'fade-show';
      } else {
        return 'fade-hide';
      }
    } catch (e) {
      return 'fade-hide';
    }
  }
}
