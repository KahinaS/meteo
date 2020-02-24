const weatherIcons = {
    "Rain": "wi wi-day-rain",
    "Clouds": "wi wi-day'cloudy",
    "Clear": "wi wi-day-sunny",
    "Snow": "wi wi-day-snow",
    "mist": "wi wi-day-fog",
    "Drizzle": "wi wi-day-sleet",
}

function capitalize(str) {
    return str[0].toUpperCase() + str.slice(1);
}

function main() {
    fetch(`https://api.ipify.org?format=json`)
        .then(resultat => resultat.json())
        .then(json => {
            const ip = json.ip;

            fetch(`http://freegeoip.net/json/` + ip)
                .then(resultat => resultat.json())
                .then(json => {
                    const ville =json.city;
                    console.log(json.ip);
                    // fetch(`http://api.openweathermap.org/data/2.5/weather?q=${ville}&appid=8e602b9ea28ed4f9f8fc97a5f6d1105c&lang=fr&units=metric`)
                })

        })
    
}