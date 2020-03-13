const weatherIcons = {
    "Rain": "wi wi-day-rain",
    "Clouds": "wi wi-day-cloudy",
    "Clear": "wi wi-day-sunny",
    "Snow": "wi wi-day-snow",
    "Mist": "wi wi-day-fog",
    "Drizzle": "wi wi-day-sleet",
    "Solar" : "wi wi-solar-eclipse"
}

function capitalize(str) {
    return str[0].toUpperCase() + str.slice(1);
}

async function main(withIP = true) {

    if (withIP) {
        //On utilise par defaut l'adresse IP pour definir la ville ici Marseille

        // Jrécupere l'IP du pc qui ouvre ma page
        const ip = await fetch('https://api.ipify.org?format=json')
            .then(resultat => resultat.json())
            .then(json => json.ip);

        // Je recupere la ville d'ou mon adresse IP dépend
        const ville = await fetch(`https://ipapi.co/${ip}/json`)
            .then(resultat => resultat.json())
            .then(json => json.city);

        const meteo = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${ville}&appid=967ae16114b5761fd203a2faa06e25ee&lang=fr&units=metric`)
            .then(resultat => resultat.json())
            .then(json => json);
            displayWeatherInfos(meteo);
            
        // Recuperer la ville grace a adresse Ip http://freegeoip.net/json/adresse
    } else {
       const ville = document.querySelector('#ville').textContent;

        meteo = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${ville}&appid=967ae16114b5761fd203a2faa06e25ee&lang=fr&units=metric`)
            .then(resultat => resultat.json())
            .then(json => json);
            displayWeatherInfos(meteo);
        
    }
}

function displayWeatherInfos(data) {
    const name = data.name;
    const temperature = data.main.temp;
    const description = data.weather[0].description;
    const conditions = data.weather[0].main;
    document.querySelector("#ville").textContent = name;
    document.querySelector("#temperature").textContent = Math.round(temperature);
    document.querySelector("#conditions").textContent = capitalize(description);
    console.log(conditions)
    document.querySelector("i.wi").className = weatherIcons[conditions];
    document.body.className = conditions.toLowerCase();
}

ville = document.querySelector('#ville');
ville.addEventListener('click', () => {
    ville.contentEditable = true;
});
// MODIFIER NOTRE VILLE
ville.addEventListener('keydown', (e) => {
    if (e.keyCode === 13) {
        e.preventDefault();
        ville.contentEditable =false;
        main(false);
    }
})
// ON INDIQUE QUE SI ON APPUIE SUR 13 le code pour la touche entrée on peut plus modifiers

main();