const apiKey = `1940cb5d0df94f3a8daf8758e3359b64`;
const searchInput = document.querySelector('.section-extra-input');
const searchButton = document.querySelector('.section-extra-button');

const windValue = document.querySelector('.info-wind-value');
const countryValue = document.querySelector('.info-country-value');
const sunsetTimeValue = document.querySelector('.info-sunset-value');
const humidityValue = document.querySelector('.info-humidity-value');
const minTemperatureValue = document.querySelector('.info-min-value');
const maxTemperatureValue = document.querySelector('.info-max-value');
const sunriseTimeValue = document.querySelector('.info-sunrise-value');
const cloudnessValue = document.querySelector('.info-cloudness-value');

const cityName = document.querySelector('.content-text-city');
const weatherDescriptionName = document.querySelector('.content-text-title');
const currentTemperatureValue = document.querySelector('.info-content-value');

const weatherLogic = () => {
    const getCityCoordinates = async () => {
        const inputValue = searchInput.value;
        const geocodingURL = `http://api.openweathermap.org/geo/1.0/direct?q=${inputValue}&limit=1&appid=${apiKey}`;

        const geocodingFetchResponse = await fetch(geocodingURL);
        const geocodingJsonData = await geocodingFetchResponse.json();

        let latitudeValue = geocodingJsonData[0].lat;
        let longitudeValue = geocodingJsonData[0].lon;
        cityName.innerHTML = `${geocodingJsonData[0].name}`;

        const getCountryName = async () => {
            const countriesURL = `https://restcountries.com/v3.1/alpha/${geocodingJsonData[0].country}`;

            const countriesFetchResponse = await fetch(countriesURL);
            const countriesJsonData = await countriesFetchResponse.json();

            countryValue.innerHTML = `${countriesJsonData[0].name.common}`
        }
        getCountryName();

        const getCityWeather = async () => {
            const openWeatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${latitudeValue}&lon=${longitudeValue}&appid=${apiKey}`;

            const openWeatherFetchResponse = await fetch(openWeatherURL);
            const openWeatherJsonData = await openWeatherFetchResponse.json();

            windValue.innerHTML = `${openWeatherJsonData.wind.speed}m/s`;
            cloudnessValue.innerHTML = `${openWeatherJsonData.clouds.all}%`;
            humidityValue.innerHTML = `${openWeatherJsonData.main.humidity}%`;
            weatherDescriptionName.innerHTML = `${openWeatherJsonData.weather[0].description}`;

            const convertKelvinToCelsius = () => {
                const celsiusMinTemperature = (openWeatherJsonData.main.temp_min - 273.15);
                const celsiusMaxTemperature = (openWeatherJsonData.main.temp_max - 273.15);
                const celsiusCurrentTemperature = (openWeatherJsonData.main.temp - 273.15);

                minTemperatureValue.innerHTML = `${celsiusMinTemperature.toFixed()}º`;
                maxTemperatureValue.innerHTML = `${celsiusMaxTemperature.toFixed()}º`;
                currentTemperatureValue.innerHTML = `${celsiusCurrentTemperature.toFixed()}º`;
            }
            convertKelvinToCelsius();

            const getCurrentTime = () => {
                const sunsetTimestamp = openWeatherJsonData.sys.sunset;
                const sunriseTimestamp = openWeatherJsonData.sys.sunrise;

                const newSunsetDate = new Date(sunsetTimestamp * 1000);
                const newSunriseDate = new Date(sunriseTimestamp * 1000);

                const formatCurrentTime = () => {
                    if (newSunsetDate.getHours() < 10 && newSunsetDate.getMinutes() < 10) {
                        sunsetTimeValue.innerHTML = `0${newSunsetDate.getHours()}:0${newSunsetDate.getMinutes()}`;
                    } else if (newSunsetDate.getHours() < 10) {
                        sunsetTimeValue.innerHTML = `0${newSunsetDate.getHours()}:${newSunsetDate.getMinutes()}`;
                    } else if (newSunsetDate.getMinutes() < 10) {
                        sunsetTimeValue.innerHTML = `${newSunsetDate.getHours()}:0${newSunsetDate.getMinutes()}`;
                    }

                    if (newSunriseDate.getHours() < 10 && newSunriseDate.getMinutes() < 10) {
                        sunriseTimeValue.innerHTML = `0${newSunriseDate.getHours()}:0${newSunriseDate.getMinutes()}`;
                    } else if (newSunriseDate.getHours() < 10) {
                        sunriseTimeValue.innerHTML = `0${newSunriseDate.getHours()}:${newSunriseDate.getMinutes()}`;
                    } else if (newSunriseDate.getMinutes() < 10) {
                        sunriseTimeValue.innerHTML = `${newSunriseDate.getHours()}:0${newSunriseDate.getMinutes()}`;
                    }
                }
                formatCurrentTime();
            }
            getCurrentTime();
        }
        getCityWeather();
    }
    getCityCoordinates();
}

searchButton.addEventListener('click', () => {
    const inputSearchValue = searchInput.value;

    const validateInputValue = () => {
        if (!inputSearchValue) {
            setTimeout(() => {
                searchInput.classList.add('error');
                searchButton.classList.add('error');

                setTimeout(() => {
                    searchInput.classList.remove('error');
                    searchButton.classList.remove('error');
                }, 2500);
            }, 100);
        } else {
            weatherLogic();
        }
    }
    validateInputValue();
});  