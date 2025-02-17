import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import moment from 'moment';

@Component({
  selector: 'app-weather-app',
  standalone: false,
  templateUrl: './weather-app.component.html',
  styleUrl: './weather-app.component.css'
})
export class WeatherAppComponent implements OnInit {
    cityName: string = '';
    stateCode: string = '';
    countryCode: string = '';
    zipCode: string = '';
    weatherData: any;
    iconUrl: string = '';
    currentDate: string = '';
    loading: boolean = false;
    error: string = '';

    private url = 'https:api.openweathermap.org/data/2.5/weather';
    private apiKey = 'aae204d70911ea34a8b2e1ac68cd040b';

    constructor(private http: HttpClient) { }

    ngOnInit(): void {
        this.getWeather();
    }

    getWeather(): void {
      this.loading = true;
      this.error = '';
      //const fullUrl = `${this.url}?q=${this.cityName},${this.stateCode},${this.countryCode}&appid=${this.apiKey}&units=imperial`;
      const fullUrl = `${this.url}?q=${this.zipCode}&appid=${this.apiKey}&units=imperial`;
      this.http.get(fullUrl).subscribe(
        (data: any) => {
          this.weatherData = data;
          this.iconUrl = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
          this.currentDate = moment().format('MMMM Do YYYY, h:mm:ss a');
          document.getElementById('weather-info')?.style.setProperty('display', 'block');
          this.loading = false;
        },
        (error) => {
          this.error = 'City not found. Please try again';
          this.loading = false;
          console.error('Error fetching weather data: ', error);
        }
      );
    }
}
