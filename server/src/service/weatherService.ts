import dotenv from 'dotenv';
dotenv.config();

// TODO: Define an interface for the Coordinates object
interface Coordinates {
  latitude: number;
  longitude: number;
}
class Weather  {
  tempF: number;
  humidity: number;
  windSpeed: number;
  iconDescription: string;
  icon: string;
  date: string;
  city: string;
 
  constructor(
    tempF: number,
    humidity: number,
    windSpeed: number,
    iconDescription: string,
    icon: string,
    date: string,
    city: string
  ) {
    this.tempF = tempF;
    this.humidity = humidity;
    this.windSpeed = windSpeed;
    this.iconDescription = iconDescription;
    this.icon = icon;
    this.date = date;
    this.city = city;
  }
}
// TODO: Complete the WeatherService class
// TODO: Define the baseURL, API key, and city name properties
class WeatherService {
  private baseURL: string;
  private apiKey: string;
  private geoURL: string;
  private cityName: string;
  private cityId: string;

  constructor() {
    this.baseURL = "https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}";
    this.geoURL = "http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}";
    this.apiKey = process.env.WEATHER_API_KEY || '';
    this.cityName = '';
    this.cityId = '';
  }

  private async fetchLocationData(): Promise<any> {
    const response = await fetch(this.buildGeocodeQuery());
    return response.json();
  }

  private destructureLocationData(locationData: any): Coordinates {
    return {
      latitude: locationData.coord.lat,
      longitude: locationData.coord.lon,
    };
  }
// TODO: Create buildGeocodeQuery method
  // private buildGeocodeQuery(): string {}
  private buildGeocodeQuery(): string {
    if (this.cityName) {
       return `${this.geoURL}/direct?id=${this.cityId}&appid=${this.apiKey}`;
    }
       return  `${this.geoURL}/direct?q=${this.cityName}&appid=${this.apiKey}`;
  }

  // private buildWeatherQuery(coordinates: Coordinates): string {
  //   return `weather?lat=${coordinates.latitude}&lon=${coordinates.longitude}&appid=${this.apiKey}`;
  // }
  private buildWeatherQuery(coordinates: Coordinates): string {
    return `forecast?lat=${coordinates.latitude}&lon=${coordinates.longitude}&appid=${this.apiKey}&units=imperial`;
  }

  // private async fetchAndDestructureLocationData(): Promise<Coordinates> {
  //   const locationData = await this.fetchLocationData(this.buildGeocodeQuery());
  //   return this.destructureLocationData(locationData);
  // }
  private async fetchAndDestructureLocationData(): Promise<Coordinates> {
    const locationData = await this.fetchLocationData();
    return this.destructureLocationData(locationData);
  }
  
  private async fetchWeatherData(coordinates: Coordinates): Promise<any> {
    const response = await fetch(`${this.baseURL}${this.buildWeatherQuery(coordinates)}`);
    return response.json();
  }

  private parseCurrentWeather(response: any): Weather {
    return new Weather(
      response.main.temp,
      response.main.humidity,
      response.wind.speed,
      response.weather[0].description,
      response.weather[0].icon,
      response.dt_txt,
      response.city.cityName
    );
  }
// TODO: Complete buildForecastArray method
  // private buildForecastArray(currentWeather: Weather, weatherData: any[]): {}
  private buildForecastArray(currentWeather: Weather, weatherData: any[]): Weather [] {
    const dailyForecasts = weatherData.filter((_: any, index: number) => index % 8 === 0)
    .map(data => new Weather(
      data.main.temp,
      data.main.humidity,
      data.wind.speed,
      data.weather[0].description,
      data.weather[0].icon,
      data.dt_txt,
      data.city.cityName
    ));

  // Return current weather followed by forecast array
  return [currentWeather, ...dailyForecasts];
}
   async getWeatherForCity(city: string): Promise<Weather[]> {
    this.cityName = city;
    const coordinates = await this.fetchAndDestructureLocationData();
    const weatherData = await this.fetchWeatherData(coordinates);
    const currentWeather = this.parseCurrentWeather(weatherData);
    return this.buildForecastArray(currentWeather, weatherData.list || []);
  }
}

export default new WeatherService(); 

 

  
  // TODO: Create destructureLocationData method
  // private destructureLocationData(locationData: Coordinates): Coordinates {}
  // TODO: Create buildGeocodeQuery method
  // private buildGeocodeQuery(): string {}
  // TODO: Create buildWeatherQuery method
  // private buildWeatherQuery(coordinates: Coordinates): string {}
  // TODO: Create fetchAndDestructureLocationData method
  // private async fetchAndDestructureLocationData() {}
  // TODO: Create fetchWeatherData method
  // private async fetchWeatherData(coordinates: Coordinates) {}
  // TODO: Build parseCurrentWeather method
  // private parseCurrentWeather(response: any) {}
  // TODO: Complete buildForecastArray method
  // private buildForecastArray(currentWeather: Weather, weatherData: any[]) {}
  // TODO: Complete getWeatherForCity method
  // async getWeatherForCity(city: string) {}
 

