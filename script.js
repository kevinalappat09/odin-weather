const Body = document.querySelector("body");

const WeatherButton = document.querySelector(".get-weather");
const Selector = document.querySelector("select");

const InformationDiv = document.querySelector(".information");
const City = document.querySelector(".city");
const Country = document.querySelector(".country");
const LongLat = document.querySelector(".longlat");

const ConditionIcon = document.querySelector(".condition-icon");
const ConditionText = document.querySelector(".condition-text");
const Temp = document.querySelector(".temp");
const Precip = document.querySelector(".precip");

async function getWeather(location) {
    const responseData = await fetch("http://api.weatherapi.com/v1/current.json?key=e1d464c01ac143efa7d110425231612&q="+location+"&aqi=no",{mode: "cors"});
    const paresedResponse = await responseData.json();
    console.log(paresedResponse);
    const weatherPacket = {
        city : paresedResponse.location.name,
        country : paresedResponse.location.country,
        longlat : String(paresedResponse.location.lon) + " " + String(paresedResponse.location.lat),
        condition : paresedResponse.current.condition.text,
        temp_c : paresedResponse.current.temp_c,
        temp_f : paresedResponse.current.temp_f,
        precip : paresedResponse.current.precip_in,
        is_day : paresedResponse.current.is_day
    };
    return weatherPacket;
}

function rebuildUI(packet) {
    City.textContent = packet.city;
    Country.textContent = packet.country;
    LongLat.textContent = packet.longlat;
    ConditionText.textContent = packet.condition;
    Temp.textContent = packet.temp_c;
    Precip.textContent = packet.precip;

    let iconElement = document.createElement('i');
    iconElement.className = "material-icons";
    iconElement.style.fontSize = "64px";
    iconElement.textContent = "";

    console.log(packet.is_day);
    if(packet.is_day === 0) {
        Body.style.backgroundColor = "var(--night)";
        Body.style.color = "var(--text-white)";

        if(packet.condition === "Clear") {
            iconElement.textContent = "bedtime";
            ConditionIcon.appendChild(iconElement);
        } else if(packet.condition === "Overcast") {
            iconElement.textContent = "foggy";
            ConditionIcon.appendChild(iconElement);
        } else if(packet.condition === "Sunny") {
            iconElement.textContent = "bedtime";
            ConditionIcon.appendChild(iconElement);
        } else if(packet.condition === "Partly Cloudy") {
            iconElement.textContent = "cloud";
            ConditionIcon.appendChild(iconElement);
        } else if(packet.condition === "Rain") {
            iconElement.textContent = "rain";
            ConditionIcon.appendChild(iconElement);
        }

    } else if(packet.is_dat === 1) {
        Body.style.backgroundColor = "var(--day)";
        Body.style.color = "var(--text-black)"


        if(packet.condition === "Clear") {
            iconElement.textContent = "sunny";
            ConditionIcon.appendChild(iconElement);
        } else if(packet.condition === "Overcast") {
            iconElement.textContent = "cloud";
            ConditionIcon.appendChild(iconElement);
        } else if(packet.condition === "Sunny") {
            iconElement.textContent = "sunny";
            ConditionIcon.appendChild(iconElement);
        } else if(packet.condition === "Partly Cloudy") {
            iconElement.textContent = "cloud";
            ConditionIcon.appendChild(iconElement);
        } else if(packet.condition === "Rain") {
            iconElement.textContent = "rain";
            ConditionIcon.appendChild(iconElement);
        }
    }


}

WeatherButton.addEventListener("click",() => {
    const location = Selector.value;
    getWeather(location)
        .then((wp) => {
            const packet = wp;
            rebuildUI(packet);
        })
        .catch((err) => {
            console.log(err);
        });

})

