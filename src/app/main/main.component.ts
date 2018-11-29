import { Component, OnInit } from '@angular/core';
import {ValidationCheck} from '../models/validationCheck';
import {ApiService} from '../api.service';
import {City} from '../models/city';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  currentValidation: ValidationCheck;
  currentSelection: City;

  constructor(private apiService: ApiService) { }

  ngOnInit() {
  }

  autoCompleteCallback1(selectedData: any) {
    // Do things!
    console.log(selectedData);

    this.parseResponse(selectedData);
  }

  parseResponse (selectedData) {
    this.currentValidation = new ValidationCheck();
    this.currentSelection = new City();

    let json = selectedData.data.address_components;
    let geometry = selectedData.data.geometry.location;
    this.currentSelection.setLatitude(geometry.lat);
    this.currentSelection.setLongitude(geometry.lng);

    console.log(json);
    for (let prop in json) {
      // console.log('key: ' + prop);
      // console.log(json[prop].long_name);
      let types = json[prop].types;
      for (let type in types) {
        console.log(json[prop].types[type]);

        if (json[prop].types[type] === 'locality') {
          break;
        }

        // Check for city value
        if (json[prop].types[type] === 'locality') {
          this.currentValidation.setHasLocality(true);
          this.currentSelection.setCityName(json[prop].long_name);
        }

        // Check for state value
        if (json[prop].types[type] === 'administrative_area_level_1') {
          this.currentValidation.setHasState(true);
          this.currentSelection.setCityState(json[prop].long_name);
        }
      }
    }
    console.log(this.currentSelection);
    this.validateResponse(this.currentValidation);
  }

  validateResponse (currentValidation) {
    if (currentValidation.hasLocality && currentValidation.hasState) {
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

  addCity() {
    // @ts-ignore
    this.apiService.addCity(this.currentSelection).subscribe(
      (response) => this.handleSuccess(response),
      (error) => this.handleFailure(error)
    );
  }

  handleTimeZoneSuccess(response) {
    // Calculate Offset
    if (this.currentValidation.isValid) {
      let offset = (response.rawOffset / 60 / 60);
      this.currentSelection.setTimeZoneOffset(offset);
      this.addCity();
    }
    console.log('Failure: City is not valid');
  }

  private handleSuccess(response) {
    this.currentValidation.setHasTimeZone(true);
    console.log(response);
  }

  private handleFailure(error) {
    console.log(error);
  }

  checkValidation () {
    try {
      if (this.currentValidation.isValid) {
        return 'hide-page';
      } else {
        return 'show-page';
      }
    } catch (e) {
      return 'hide-page';
    }
  }

  checkSuccessValidation () {
    try {
      if (this.currentValidation.isValid && this.currentValidation.hasTimeZone) {
        // @TODO revert back to 'hide-page' after a few seconds
        return 'show-page';
      } else {
        return 'hide-page';
      }
    } catch (e) {
      return 'hide-page';
    }
  }

}
