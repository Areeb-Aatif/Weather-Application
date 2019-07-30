const form = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const img = document.querySelector('img.time');
const icon = document.querySelector('.icon img');
const heading = document.querySelector('.input h1');
const label = document.querySelector('form label');
const forecast = new Forecast();

const updateUI = (data) => {

    // Destructuring
    const { cityData, cityWeather } = data;

    let inputImage = null;
    if (cityWeather.IsDayTime) {
        inputImage = 'img/day.jpg';
        if (heading.classList.contains('whiteText')) {
            heading.classList.remove('whiteText');
        }
        if (label.classList.contains('whiteText')) {
            label.classList.remove('whiteText');
        }
    } else {
        inputImage = 'img/night.jpg';
        heading.classList.add('whiteText');
        label.classList.add('whiteText');
    }
    img.setAttribute('src', inputImage);

    details.innerHTML = `
        <h5 class="my-3">${cityData.EnglishName}</h5>
        <div class="my-3">${cityWeather.WeatherText}</div>
        <div class="display-4 my-4">
            <span>${cityWeather.Temperature.Metric.Value}</span>
            <span>&deg;C</span>
        </div>
    `;

    const iconSrc = `img/icons/${cityWeather.WeatherIcon}.svg`;
    icon.setAttribute('src', iconSrc);

    if (card.classList.contains('d-none')) {
        card.classList.remove('d-none');
    }
};

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const city = form.city.value.trim();
    form.reset();

    forecast.updateWeather(city)
        .then(data => updateUI(data))
        .catch(err => console.log(err));

    localStorage.setItem('city', city);
});

if(localStorage.getItem('city')){
    forecast.updateWeather(localStorage.getItem('city'))
        .then(data => updateUI(data))
        .catch(err => console.log(err));
}