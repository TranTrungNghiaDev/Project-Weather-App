const getWeatherData = async (userInput) => {
  url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${userInput}?unitGroup=metric&key=YWVYR6NTGWJZ2979VJ2EYF6HG&contentType=json`;
  try {
    const response = await fetch(url, {
      mode: "cors",
    });
    if (response.status === 200) {
      const weatherData = await response.json();
      return weatherData;
    } else {
      throw new Error("404 Not Found");
    }
  } catch (error) {
    console.log(error);
  }
};

const getWeatherInfo = async (weatherDataPromise) => {
  const weatherData = await weatherDataPromise;
  const icon = weatherData.currentConditions.icon;

  const bodyElement = document.querySelector("body");
  if(icon.includes("rain")) {
    bodyElement.style.backgroundImage = "url('./imgs/rain.jpg')";  
  }
  else if(icon.includes("cloud")) {
    bodyElement.style.backgroundImage = "url('./imgs/cloud.jpg')";  
  }
  else {
    bodyElement.style.backgroundImage = "url('./imgs/rain.jpg')"; 
  }

  if (weatherData) {
    const weatherInfo = {
      address: weatherData.address,
      description: weatherData.description,
      conditions: weatherData.currentConditions.conditions,
      feelslike: weatherData.currentConditions.feelslike,
      temp: weatherData.currentConditions.temp,
      windspeed: weatherData.currentConditions.windspeed,
    };

    return weatherInfo;
  }
};

const removeAllSpaceInString = (str) => {
  return str.split(" ").join("");
};

const capitalizeFirstLetter = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

const submitBtn = document.querySelector("#submit");
submitBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const userInputElement = document.querySelector("#search");
  const userInput = removeAllSpaceInString(userInputElement.value);
  const weatherData = getWeatherData(userInput);
  const weatherInfo = getWeatherInfo(weatherData);
  displayWeatherInfo(weatherInfo);
});

const displayWeatherInfo = async (weatherInfoPromise) => {
  const weatherInfo = await weatherInfoPromise;
  const weatherInfoList = document.querySelector("#weather-info-list");
  weatherInfoList.innerHTML = "";
  for (const property in weatherInfo) {
    const upperCaseProperty = capitalizeFirstLetter(property);
    const weatherInfoListItem = document.createElement("li");
    weatherInfoListItem.textContent = `${upperCaseProperty} : ${weatherInfo[property]}`;
    weatherInfoList.appendChild(weatherInfoListItem);
  }
};
