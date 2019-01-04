import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Sparklines, SparklinesLine} from 'react-sparklines';
import Chart from '../components/chart';
import _ from 'lodash';
import './styles.css';

class WeatherList extends Component{
    renderWeather(cityData){
        const name = cityData.city.name;
        const temp = _.map(cityData.list.map((weather) => weather.main.temp), (temp) => temp - 273);
        const pressure = cityData.list.map((weather) => weather.main.pressure);
        const humidity = cityData.list.map((weather) => weather.main.humidity);
       // const lon = cityData.city.coord.lon;
        //const lat = cityData.city.coord.lat;
        // or const {lat, lan} = cityData.city.coord;
        return(
            <tr key={cityData.city.name}>
                <td>
                    <h1>  {name}   </h1>
                </td>
                <td>
                    <Chart data={temp} color="orange" units="C"/>
                </td>
                <td>
                    <Chart data={pressure} color="blue" units="hPa"/>
                </td>
                <td>
                    <Chart data={humidity} color="green" units="%"/>
                </td>
            </tr>
        )
    }
        render(){
            return(
             <table className="table table-hover">
             <thead>
                 <tr>
                     <th> City </th>
                     <th> Temperature (C) </th>
                     <th> Pressure (hPa) </th>
                     <th> Humidity (%) </th>
                 </tr>
             </thead>
             <tbody>
                 {this.props.weather.map(this.renderWeather)}
            </tbody>
             </table> 
            )
        }
}


function mapStateToProps(state){
    return { weather : state.weather};
}

export default connect(mapStateToProps)(WeatherList);