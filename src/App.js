// import logo from './logo.svg';
import "./App.css";
import React from "react";
import credentials from "./Credentials";

const LocationInput = (props) => {
	const [location, setLocation] = React.useState();

	const getWeather = async () => {
		const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${credentials.api_Key}`;

		try {
			const res = await fetch(url);
			const data = await res.json();
      console.log(data);
      props.onSubmit(data);

      return data

      // return data;
		} catch (error) {
			console.log("Error in get call!!");
		}

	};




	return (
		<div>
			<input
				type="text"
				placeholder="Enter Location here..."
				onChange={(e) => setLocation(e.target.value)}
			></input>

			<button onClick={getWeather}>Get Weather</button>
		</div>
	);
};

const WeatherCards = (props) => (
  
    <div>
      {props.weatherInfos.map(weatherInfo => <WeatherCard key = {weatherInfo.id} {...weatherInfo} />)}
    </div>
)

const WeatherCard = (props) => (
    <div>
      props.coords
    </div>
)


function App() {
  const [weatherData, setWeatherData] = React.useState([]);
  const addNewWeatherData = (newWeatherData) => {
    setWeatherData(...weatherData, newWeatherData)
  };

	return (
		<div>
			<LocationInput onSubmit={addNewWeatherData} />
      <WeatherCards weatherInfos={weatherData} />
			I'm still working
		</div>
	);
}

export default App;
