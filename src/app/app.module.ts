import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { TownsComponent } from './towns/towns.component';
import { NavigationComponent } from './navigation/navigation.component';
import { MainComponent } from './main/main.component';
import { Ng4GeoautocompleteModule } from 'ng4-geoautocomplete';


@NgModule({
  declarations: [
    AppComponent,
    TownsComponent,
    NavigationComponent,
    MainComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    Ng4GeoautocompleteModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
