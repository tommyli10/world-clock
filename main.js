// defines each clock hand and 
const secondHand = document.querySelector('.second-hand');
const minuteHand = document.querySelector('.min-hand');
const hourHand = document.querySelector('.hour-hand');
const dateText = document.querySelector('.date');
const dayText = document.querySelector('.day');

// set the default city to LA, but this variable can be change later if the user click on a different city
var city = 'la';

// cities options
const locations = Array.from(document.querySelectorAll('.city'));

// this object stores the time offset from UTC for each locations and the location's background picture
var locationData = {
    'ny': [-5, 'https://cdn.glitch.global/4be6c257-8b85-4358-9143-36cf8be89f98/ny?v=1650135632727'],
    'la': [-8, 'https://cdn.glitch.global/4be6c257-8b85-4358-9143-36cf8be89f98/la?v=1650135575780'],
    'shanghai': [8, 'https://cdn.glitch.global/4be6c257-8b85-4358-9143-36cf8be89f98/shanghai?v=1650135800087'],
    'london': [1, 'https://cdn.glitch.global/4be6c257-8b85-4358-9143-36cf8be89f98/london?v=1650135553596']
};



// get current time and change each hands based on current time
function setDate() {
    let localTime = new Date();

    // convert the local time to UTC time as a base for conversion
    // since getTimezoneOffset gives us a number in minutes, we multiply it by 60 seconds then 1000 miliseconds to get the 60000
    let utc = localTime.getTime() + (localTime.getTimezoneOffset() * 60000);
    let standaradTime = new Date(utc);

    // convert utc time to other cities' time based on offset and update 'now'
    let localOffset = standaradTime.getTime() + (locationData[city][0] * 60 * 60000);
    let now = new Date(localOffset);

    const seconds = now.getSeconds();
    const secondsDeg = ((seconds / 60) * 360) + 90;

    const minutes = now.getMinutes();
    const minutesDeg = ((minutes / 60) * 360) + 90;

    const hours = now.getHours();
    const hoursDeg = ((hours / 12) * 360) + ((minutes / 60) * 30) + 90;

    const date = getDateText(now.getTime());
    const day = getDayText(now.getTime());

    secondHand.style.transform = `rotate(${secondsDeg}deg)`;
    minuteHand.style.transform = `rotate(${minutesDeg}deg)`;
    hourHand.style.transform = `rotate(${hoursDeg}deg)`;
    dateText.textContent = date;
    dayText.textContent = day;
}

// the getDate and getDay function only returns number, so we need to convert them to text using these two functions
function getDateText(time) {
    let now = new Date(time);
    let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${months[now.getMonth()]} ${now.getDate()}, ${now.getFullYear()}`;
}

function getDayText(time) {
    let now = new Date(time);
    switch (now.getDay()) {
        case 0:
            return 'Sun';
        case 1:
            return 'Mon';
        case 2:
            return 'Tue';
        case 3:
            return 'Wed';
        case 4:
            return 'Thur';
        case 5:
            return 'Fri';
        case 6:
            return 'Sat';
    }
}


// when city is changed, this function changes the background pic and updates the city variable
function changeCity(e) {
    // update city variable
    city = e.target.getAttribute('id');

    // change style of buttons
    const selectedCity = e.target;
    locations.forEach(city => {
        if (city == selectedCity) {
            city.classList.add('selected');
        } else {
            city.classList.remove('selected');
        }
    });

    // change background pic
    const page = document.querySelector('html');
    page.style.background = `url(${locationData[city][1]}) no-repeat center center fixed`;
    page.style.backgroundSize = 'cover';
    page.style.transition = 'all 2s';
}

// make setDate run once per second
setInterval(setDate, 1000);

// add event listeners to each city button
locations.forEach(location => location.addEventListener('click', changeCity));