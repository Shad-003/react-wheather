import React, { useState } from 'react'
import './WheatherApp.css'

import search_icon from '../Assests/search.png'
import clear_icon from '../Assests/clear.png'
import cloud_icon from '../Assests/cloud.png'
import drizzle_icon from '../Assests/drizzle.png'
import humidity_icon from '../Assests/humidity.png'
import rain_icon from '../Assests/rain.png'
import snow_icon from '../Assests/snow.png'
import wind_icon from '../Assests/wind.png'

const WheatherApp = () => {

  let api_key = "f9614cbf9957b080b839b386392bf32e";

  //------------use sate according to cloud icon--------------

  const [wicon, setWicon] = useState(cloud_icon);

  const search = async () => {
    const element = document.getElementsByClassName("cityInput");
    if (element[0].value === "") {
      return 0;
    }
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=Metric&appid=${api_key}`;

    let response = await fetch(url);
    let data = await response.json();
    //---------------------get elements using className of divs------------------
    const humidity = document.getElementsByClassName("humidity-percent");
    const wind = document.getElementsByClassName("wind-rate");
    const temprature = document.getElementsByClassName("wheater-temp");
    const location = document.getElementsByClassName("wheather-location");

    // -------------------change the data according to weather--------------

    humidity[0].innerHTML = data.main.humidity + " %";
    wind[0].innerHTML = data.wind.speed + " km/h";
    temprature[0].innerHTML = data.main.temp + " °c";
    location[0].innerHTML = data.name;

    // ---------------icon logic with repect to weather------------------

    if (data.weather[0].icon === '01d' || data.weather[0].icon === '01n') {
      setWicon(clear_icon);
    }
    else if (data.weather[0].icon === '02d' || data.weather[0].icon === '02n') {
      setWicon(cloud_icon);
    }
    else if (data.weather[0].icon === '03d' || data.weather[0].icon === '03n') {
      setWicon(drizzle_icon);
    }
    else if (data.weather[0].icon === '04d' || data.weather[0].icon === '04n') {
      setWicon(drizzle_icon);
    }
    else if (data.weather[0].icon === '09d' || data.weather[0].icon === '09n') {
      setWicon(rain_icon);
    }
    else if (data.weather[0].icon === '10d' || data.weather[0].icon === '10n') {
      setWicon(rain_icon);
    }
    else if (data.weather[0].icon === '13d' || data.weather[0].icon === '13n') {
      setWicon(snow_icon);
    }
    else{
      setWicon(clear_icon);
    }
  }

  return (
    <>
      <div className="container">

        <div className="top-bar">
          <input type="text" className="cityInput" placeholder='Search' />
          <div className="search-icon" onClick={() => { search() }}>
            <img src={search_icon} alt="" />
          </div>
        </div>

        <div className="wheater-img">
          <img src={wicon} alt="" />
        </div>
        {/* shortcut for degree c is ALT(hold)+0176 */}
        <div className="wheater-temp">24°c</div>
        <div className="wheather-location">London</div>
        {/* -------------lower part-------------- */}
        {/* -----------Humidity----------- */}
        <div className="data-container">

          <div className="element">
            <img src={humidity_icon} alt="" className="icon" />
            <div className="data">
              <div className="humidity-percent">64%</div>
              <div className="text">Humidity</div>
            </div>
          </div>
          {/* ------------------wind speed---------------- */}

          <div className="element">
            <img src={wind_icon} alt="" className="icon" />
            <div className="data">
              <div className="wind-rate">18 km/hr</div>
              <div className="text">Wind speed</div>
            </div>
          </div>

        </div>

      </div>
    </>
  )
}

export default WheatherApp
