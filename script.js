const WeatherButton = document.querySelector("button");
const Select = document.querySelector("select");

const SwitchToCelsiusButton = document.querySelector(".switch_c");
const SwitchToFahrenheitButton = document.querySelector(".switch_f");

const Information = document.querySelector(".information");

const OverviewTempCelsius = document.querySelector(".temp_c");
const OverviewTempFah = document.querySelector(".temp_f");
const OverviewCondition = document.querySelector(".condition");
const SpecificPrecipIn = document.querySelector(".precip_in");
const SpecificPrecipMm = document.querySelector(".precip_mm");
const SpecificGustKph = document.querySelector(".gust_kph");
const SpecificGustMph = document.querySelector(".gust_mph");

async function getWeather(location) {
    const responseData = await fetch("http://api.weatherapi.com/v1/current.json?key=e1d464c01ac143efa7d110425231612&q="+location+"&aqi=no",{mode: "cors"});
    const paresedResponse = await responseData.json();
    console.log(paresedResponse);

    OverviewCondition.textContent  = paresedResponse.current.condition.text;

    OverviewTempCelsius.textContent = paresedResponse.current.temp_c;
    OverviewTempFah.textContent = paresedResponse.current.temp_f;

    SpecificPrecipIn.textContent = paresedResponse.current.precip_in;
    SpecificPrecipMm.textContent = paresedResponse.current.precip_mm;

    SpecificGustKph.textContent = paresedResponse.current.gust_kph;
    SpecificGustMph.textContent = paresedResponse.current.gust_mph;

    if(paresedResponse.current.condition.text === "Clear") {
        Information.style.backgroundColor = "#22d3ee";
    } else if(paresedResponse.current.condition.text === "Overcast") {
        Information.style.backgroundColor = "#6b7280";
    }
}

WeatherButton.addEventListener("click",() => {
    const location = Select.value;
    getWeather(location);
})

SwitchToCelsiusButton.addEventListener("click", () => {
    OverviewTempCelsius.style.visibility = "visible";
    OverviewTempFah.style.visibility = "hidden";
})

SwitchToFahrenheitButton.addEventListener("click",() => {
    OverviewTempFah.style.visibility = "visible";
    OverviewTempCelsius.style.visibility = "hidden";
})

