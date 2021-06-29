// import logo from './logo.svg';
import "./App.scss";
import React from "react";
import credentials from "./Credentials";

const LocationInput = () => {
	const [location, setLocation] = React.useState();
	const [updateWeatherData, setUpdateWeatherData] = React.useState([]);

	let getWeather = async () => {	
		const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${credentials.api_Key}`;
		
		try {
			const res = await fetch(url);
			const data = await res.json();
			let exists = false;
			// console.log(data);
			if (updateWeatherData) {
				updateWeatherData.forEach(each => {
					if (each.name === data.name) {
						exists = true;
					} 
				});
			}

			if (!exists) {
				setUpdateWeatherData(updateWeatherData => ([...updateWeatherData, data]));
			} else {
				console.log('This location already exists');
			}

		} catch (error) {
			console.log("Error in getting location data");
		}	
	};
	
	

	return (
		<>
			<div className="input_container">
				<input
					type="text"
					className="input_text"
					placeholder="Enter Location here..."
					onChange={(e) => setLocation(e.target.value)}
				></input>
				<button 
				onClick={getWeather}
				className="input_button"
				>
					Get Weather
				</button>
			</div>

			<WeatherCards 
				weatherInfos={updateWeatherData} 
				/>
		</>
	);
};

const WeatherCards = (props) => {

	return (
		<div className="container_cards">
      {props.weatherInfos.map(weatherInfo => <WeatherCard 
			key = {weatherInfo.name} 
			{...weatherInfo} 
			className="container_card"/>)}
    </div>
	);
}

const WeatherCard = (props) => (
    <div>
      'Coordinates' = {props.name}
    </div>
)


function App() {

	return (
		<div className="container">
			<LocationInput />
      
			I'm still working
		</div>
	);
}

export default App;
