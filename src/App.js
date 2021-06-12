// import logo from './logo.svg';
import './App.css';
import React from 'react';
import credentials from './Credentials';
// import axios from 'axios';



const LocationInput = () => {
  const [location, setLocation] = React.useState();

  const getWeather = async () => {
    const url = `api.openweathermap.org/data/2.5/weather?q=${location}&appid=${credentials.api_Key}`;

    try {
      const response = await fetch(url);
      const weather_data = response.data;
      console.log('response data?', weather_data)
        
      // } catch (error) {
      //   console.log('Error happened here!')
      //   console.error(error)
      // }
    } catch (error) {
      console.log("Error in get call!!");

    }


  }

  return (

    <div>
      <input
        type="text"
        placeholder="Enter Location here..."
        onChange={(e) => setLocation(e.target.value)}
      >
      </input>

      <button
        onClick={getWeather}>
        Get Weather
      </button>
    </div>
  )
}



function App() {
  return (
    <div>
      <LocationInput />
      I'm still working
    </div>
  );
}

export default App;
