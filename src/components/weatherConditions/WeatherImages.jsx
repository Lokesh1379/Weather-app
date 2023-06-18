import React from 'react'
import './style.css'
import sunny from '../Images/SunnyDay.svg';
import haze from '../Images/Haze.svg'
import mostcloudynight from '../Images/MostCloudyNight.svg';
import mostcloudyday from '../Images/MostCloudyDay.svg'
import thunderstrom from '../Images/thunderstorms.png'
import rain from '../Images/ModerateRainV2.svg'
import moon from '../Images/ClearNightV3.svg';
import dust from '../Images/fog.png'


const WeatherImages = ({ time, cond = "Clouds" }) => {

    return <>
        {(time >= 5 && time <= 18) && cond === 'Clear' ? <img src={sunny} alt="" className='c-img' /> : null}
        {(time < 5 || time > 18) && cond === 'Clear' ? <img src={moon} alt="" className='c-img' /> : null}
        {(time >= 5 && time <= 18) && cond === 'Clouds' ? <img src={mostcloudyday} alt="" className='c-img' /> : null}
        {(time < 5 || time > 18) && cond === "Clouds" ? <img src={mostcloudynight} alt="" className='c-img' /> : null}
        {cond === "Thunderstorm" ? <img src={thunderstrom} alt="" className='c-img' /> : null}
        {cond === "Rain" ? <img src={rain} alt="" className='c-img' /> : null}
        {cond === 'Dust' ? <img src={dust} alt="" className='c-img' /> : null}
        {cond === 'Haze' ? <img src={haze} alt="" className='c-img' /> : null}
    </>
}

export default WeatherImages