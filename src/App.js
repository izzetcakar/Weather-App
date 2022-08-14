import React from 'react'
import { WeatherProvider } from './Context/WeatherContext'
import Weather from './Components/Weather'
const App = () => {
  return (
    <WeatherProvider>
      <Weather/>
    </WeatherProvider>
  )
}

export default App