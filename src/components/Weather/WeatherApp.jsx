import React, { useEffect, useState } from 'react'
import './style.css'
import Night from '../Images/nighttt.jpg'
import Day from '../Images/day.png'
import WeatherImages from '../weatherConditions/WeatherImages'
import Axios from 'axios'

const WeatherApp = () => {
    let [loc, setLoction] = useState();
    let [city, setCity] = useState("DELHI");
    let [temperature, setTemperature] = useState();
    let [humidty, setHumidity] = useState();
    let [onsearch, setonsearch] = useState(false);
    let [timer, setTimer] = useState();
    let [cloud, setCloud] = useState();
    let [windspeed, setWindspeed] = useState();
    useEffect(() => {
        async function fetchData() {
            try {
                let response = await Axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=d885aa1d783fd13a55050afeef620fcb`);
                console.log(response)
                let res = await response.data;

                if (res !== undefined) {
                    const kelvin = res.main.temp;
                    const celsius = kelvin - 273.15;
                    setTemperature(Math.trunc(celsius));
                    setHumidity(res.main.humidity);
                    setonsearch(true);
                    setCloud(res.weather[0].main);
                    setWindspeed(Math.trunc(Number(res.wind.speed) * 3.6));
                }
            }
            catch (error) {
                console.log(error);
                setonsearch(false)
            }
            setInterval(() => {
                let time = new Date();
                setTimer(time.getHours());
            }, 1000)
        }
        fetchData();
    }
        ,
        [city]
    )

    const searchHandler = () => {
        setCity(loc.toUpperCase())
    }

    return <>

        <div className="main-container" style={{
            backgroundImage: timer > 18 || timer < 6 ? `url(${Night})` : `url(${Day})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            width: '100%',
            height: '100vh',
        }}>
            <div className="weather-container">
                <p className='heading'>Weather</p>
                <div className="search-container">
                    <input type="text"
                        placeholder='Enter Location'
                        value={loc}
                        onChange={({ target: { value } }) => setLoction(value)}
                        id='loc'
                    />
                    <button onClick={searchHandler}> Search</button>
                </div>
                {
                    city !== '' && onsearch ?
                        <div className="details-container">
                            <div className="re-container">   <figcaption>
                                <WeatherImages time={timer} cond={cloud} />
                                <span>{cloud}</span>
                            </figcaption></div>
                            <div className="tc-container">
                                <span>Location: {city}</span>
                                <span>Temperature: {temperature}°C</span>
                                <span>Humidity: {humidty}%</span>
                                <span>windspeed : {windspeed}Kmph</span>
                            </div>
                        </div>
                        :
                        <span className='heading-2'>Please enter exact Location</span>
                }
            </div>
        </div>

    </>
}

export default WeatherApp;