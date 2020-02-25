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

async function main(withIP = true) {
    let ville;
       if(withIP) {
          //On utilise par defaut l'adresse IP pour definir la ville ici Marseille
      
       // Jrécupere l'IP du pc qui ouvre ma page
      const ip = await fetch('https://api.ipify.org?format=json')
           .then(resultat => resultat.json())
           .then(json => json.ip)
             
           // Je recupere la ville d'ou mon adresse IP dépend
        ville = await  fetch('https://freegeoip.app/json/' + ip )
               .then(resultat => resultat.json())
               .then(json => json.city)
                  
               }   else {
                   ville = document.querySelector('#ville').textContent;
               }
       const meteo = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${ville}&appid=967ae16114b5761fd203a2faa06e25ee&lang=fr&units=metric`)
               .then(resultat => resultat.json())
               .then(json => json)
           // Recuperer la ville grace a adresse Ip http://freegeoip.net/json/adresse
           displayWeatherInfos(meteo)
   }
   function displayWeatherInfos(data){
       const name = data.name;
       const temperature = data.main.temp;
       const description = data.weather[0].description;
       const conditions = data.weather[0].main;
       document.querySelector('#ville').textContent = name;
       document.querySelector('#temperature').textContent = Math.round(temperature);
       document.querySelector('#condition').textContent = description;
       document.querySelector('i.wi').className = weatherIcons[conditions];
       document.body.className = conditions.toLowerCase();
   }
   const ville = document.querySelector('#ville');
   ville.addEventListener('click', () => {
       ville.contentEditable = true;
   });
   // MODIFIER NOTRE VILLE
   ville.addEventListener('keydown', (e) => {
       if(e.keyCode === 13){
           e.preventDefault();
           ville.contentEditable = false;
           main(false);
       }
   })
   // ON INDIQUE QUE SI ON APPUIE SUR 13 le code pour la touche entrée on peut plus modifiers
   main();