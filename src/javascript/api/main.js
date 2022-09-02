const apiKey = `1940cb5d0df94f3a8daf8758e3359b64`;
const searchInput = document.querySelector('.section-extra-input');
const searchButton = document.querySelector('.section-extra-button');

const minTemperatureValue = document.querySelector('.info-min-value');
const maxTemperatureValue = document.querySelector('.info-max-value');
const currentTemperatureValue = document.querySelector('.info-content-value');

const weatherLogic = () => {

    const getCityCoordinates = async () => {
        const inputValue = searchInput.value;
        const geocodingURL = `http://api.openweathermap.org/geo/1.0/direct?q=${inputValue}&limit=1&appid=${apiKey}`;

        const geocodingFetchResponse = await fetch(geocodingURL);
        const geocodingJsonData = await geocodingFetchResponse.json();

        let latitudeValue = geocodingJsonData[0].lat;
        let longitudeValue = geocodingJsonData[0].lon;

        const getCityWeather = async () => {
            const openWeatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${latitudeValue}&lon=${longitudeValue}&appid=${apiKey}`;

            const openWeatherFetchResponse = await fetch(openWeatherURL);
            const openWeatherJsonData = await openWeatherFetchResponse.json();

            const convertKelvinToCelsius = () => {
                const celsiusMinTemperature = (openWeatherJsonData.main.temp_min - 273.15);
                const celsiusMaxTemperature = (openWeatherJsonData.main.temp_max - 273.15);
                const celsiusCurrentTemperature = (openWeatherJsonData.main.temp - 273.15);

                minTemperatureValue.innerHTML = `${celsiusMinTemperature.toFixed()}º`;
                maxTemperatureValue.innerHTML = `${celsiusMaxTemperature.toFixed()}º`;
                currentTemperatureValue.innerHTML = `${celsiusCurrentTemperature.toFixed()}º`;
            }
            convertKelvinToCelsius();
        }
        getCityWeather();
    }
    getCityCoordinates();
}

searchButton.addEventListener('click', weatherLogic);