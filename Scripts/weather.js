class Forecast {
    constructor() {
        this.apiKey = config.API_KEY;
        this.cityURI = 'http://dataservice.accuweather.com/locations/v1/cities/search';
        this.weatherURI = 'http://dataservice.accuweather.com/currentconditions/v1/';
    }
    async updateWeather(city) {
        const cityData = await this.getCity(city);
        const cityWeather = await this.getWeather(cityData.Key);

        //returning object where key name = value name.
        return { cityData, cityWeather };
    }
    async getWeather(key) {
        const query = `${key}?apikey=${this.apiKey}`;

        const response = await fetch(this.weatherURI + query);
        const data = await response.json();

        return data[0];
    }
    async getCity(city) {
        const query = `?apikey=${this.apiKey}&q=${city}`;

        const response = await fetch(this.cityURI + query);
        const data = await response.json();

        return data[0];
    }
};