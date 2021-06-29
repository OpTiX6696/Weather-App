// import logo from './logo.svg';
import "./App.scss";
import React from "react";
import credentials from "./Credentials";
// localStorage.clear()
const LocationInput = () => {


	let getDataFromLS = () => {
		let values = [];
    let keys = Object.keys(localStorage);
    let i = keys.length;

    while ( i-- ) {
        values.push( JSON.parse(localStorage.getItem(keys[i])));
    }
		console.log("All In LS", values);
    return values;
	}


	const [location, setLocation] = React.useState();
	let [updateWeatherData, setUpdateWeatherData] = React.useState([]);

	let getWeather = async () => {	
		const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${credentials.api_Key}`;
		
		try {
			const res = await fetch(url);
			const data = await res.json();

			localStorage.setItem(data.name, JSON.stringify(data));

			setUpdateWeatherData(getDataFromLS)
			console.log('Not LS', updateWeatherData);

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
      Location = {props.name}
			<br/>
			Country = {props.sys.country}
			<br/>
			Icon = {props.weather[0].icon}
			<br/>
			Condition = {props.weather[0].main}
			<br/>
			Description = {props.weather[0].description}
			<br/>
			<br/>
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












	// let exists = false;
			// if (updateWeatherData.length > 0) {
			// 	updateWeatherData.forEach(each => {
			// 		if (each.name === data.name) {
			// 			exists = true;
			// 		} 
			// 	});
			// }

			// if (!exists) {
			// 	// setUpdateWeatherData(updateWeatherData => ([...updateWeatherData, data]));

			// } else {
			// 	alert('This location already exists');
			// }
