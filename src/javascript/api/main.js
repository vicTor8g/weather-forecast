const apiKey = `1940cb5d0df94f3a8daf8758e3359b64`;
const searchInput = document.querySelector('.section-extra-input');
const searchButton = document.querySelector('.section-extra-button');

const weatherLogic = () => {
    const getGeocodingData = async () => {
        const inputValue = searchInput.value;
        const geocodingURL = `http://api.openweathermap.org/geo/1.0/direct?q=${inputValue}&limit=1&appid=${apiKey}`;

        const geocodingFetchResponse = await fetch(geocodingURL);
        const geocodingJsonData = await geocodingFetchResponse.json();

        console.log(geocodingJsonData);
    }
    getGeocodingData();
}

searchButton.addEventListener('click', weatherLogic);