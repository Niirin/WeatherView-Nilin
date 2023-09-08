import './App.css'
import './css/weather-icons.min.css' 
import { useState } from 'react';
// import './css/weather-icons.css'
function App() {

  return (
    <><body>
        <h1 className="title">Weather</h1>
        <section className="display">
          <div className="top-container">
            <div className="icons-main">
              <i className="wi wi-day-sunny-overcast big-N" alt="sunny overcast" />
            </div>
            <div className="current-weather">
              <h2>Today:  </h2>
              <h1>
                <img className="map-icon" src="/map-pin.svg" alt="current location" />
                Phnom Penh, KH
              </h1>
              <h1 className="temperature">
                24&deg; 
                {/* <img className="celsius-big " src="/celsius.svg" alt="degrees celsius"/> */}
              </h1>
              <h1>Overcast</h1>
            </div>
          </div>
          <div className="forecast-days">Next 4 Days</div>
          <div className="day-forecast-cont">
            <div className="day-forecast-1">
              <h2> Wednesday</h2>
              <i className="wi wi-day-sunny-overcast mini-N" />
            </div>
            <div className="day-forecast-2">
              <h2>25&deg;
                Overcast
              </h2>
            </div>
          </div>
          {/* Day 2 */}
          <div className="day-forecast-cont">
            <div className="day-forecast-1">
              <h2> Wednesday</h2>
              <i className="wi wi-day-sunny-overcast mini-N" />
            </div>
            <div className="day-forecast-2">
              <h2>25&deg;
                Overcast
              </h2>
            </div>
          </div>
          {/* Day 3 */}
          <div className="day-forecast-cont">
            <div className="day-forecast-1">
              <h2> Wednesday</h2>
              <i className="wi wi-day-sunny-overcast mini-N" />
            </div>
            <div className="day-forecast-2">
              <h2>25&deg;
                Overcast
              </h2>
            </div>
          </div>

        </section>
    </body>
    </>
  )
}

export default App;
