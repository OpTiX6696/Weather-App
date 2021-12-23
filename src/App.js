// import logo from './logo.svg';
import "./App.scss";
import React from "react";
import credentials from "./Credentials";
// localStorage.clear()

window.addEventListener('load', (event) => {
	localStorage.clear()
  console.log('page is fully loaded');
});



// To Get Data From LocalStorage
let getDataFromLS = () => {
	let values = [];
	let keys = Object.keys(localStorage);
	let i = keys.length;
	while ( i-- ) {
			values.push( JSON.parse(localStorage.getItem(keys[i])));
	}
	// console.log("All In LS", values);
	return values;
}

const LocationInput = () => {

	const [location, setLocation] = React.useState();
	let [updateWeatherData, setUpdateWeatherData] = React.useState([]);

	let getWeather = async () => {
		const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${credentials.api_Key}`;

		
		try {
			const res = await fetch(url);

			if (res.status === 200) {
				const data = await res.json();
				console.log(res.status);
				localStorage.setItem(data.name, JSON.stringify(data));
				setUpdateWeatherData(getDataFromLS);
			} else {
				alert("City Weather not found")
			}
			// console.log('Not LS', updateWeatherData);

		} catch (error) {
			console.log("Error in getting location data");
			alert("Error in getting location data. Try checking your internet connection.")

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
				toRefresh={() => setUpdateWeatherData(getDataFromLS)}
				/>
		</>
	);
};

const WeatherCards = (props) => {

	return (
		<div className="cards_container">
      {props.weatherInfos.map(weatherInfo => <WeatherCard 
			key = {weatherInfo.name}
			refresh = {props.toRefresh}
			{...weatherInfo} />)}
    </div>
	);
}

const WeatherCard = (props) => {

		const handleCardRemoval = (val) => {
			console.log(val);
			localStorage.removeItem(val);
			props.refresh()
		}

		// const dt = new Date(props.dt * 1000)
		// const date = dt.toString()

		return (
			<div className="card_container">
				<button
				className="remove"
				onClick={() => handleCardRemoval(props.name)}>
				Remove
				</button>

				<div className="cardInfo">
					<p className='location'>
					{props.name}, {props.sys.country}
					</p>

					{/* <p>
						Date: {date}
					</p> */}
					<img alt="Weather Graphic" src={"https://openweathermap.org/img/wn/"+props.weather[0].icon+"@2x.png"}></img>
					
					<p className="description">
						{props.weather[0].description}
					</p>

					<p className="temp">
						{(props.main.temp -273.15).toFixed(2)}°C
					</p>

					<p className="feels_like">
						Feels Like {(props.main.feels_like - 273.15).toFixed(2)}°C
					</p>

					<p className="humidity">
						{props.main.humidity}% Humidity
					</p>

				</div>

		</div>
		)
}


function App() {

	return (
		<div className="container">
			<LocationInput />
		</div>
	);
}

export default App;


