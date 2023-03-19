import { useState } from 'react'
import axios from 'axios';

import './App.css'

function App() {
  const [location, setlocation] = useState('');
  const [weather, setweather] = useState({})

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`/api/weather/${location}`);
      console.log('Response:', response.data);
      setweather(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
      setweather(null);
    }
  };


  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <label>
          Location:
          <input type="text" value={location} onChange={(e) => setlocation(e.target.value)} />
        </label>
        <button type="submit">Get Weather</button>
      </form>
      <div>
        <div>
          <h1>{JSON.stringify(weather.temp)}</h1>
        </div>
      </div>
    </div>
  );
}

export default App;