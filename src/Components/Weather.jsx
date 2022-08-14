import React, { useRef } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import styled from "styled-components";
import WeatherContext from "../Context/WeatherContext";
import { cities } from "../data/cities_data";
import DailyWeather from "./DailyWeather";

const Container = styled.div`
  display: flex;
  border-radius: 10px;
  background-color: #3a0131;
  width: 100%;
  height: 90vh;
  color: #3a0131;
`;
const DailyWeatherContainer = styled.div`
  display: flex;
  flex: 4;
  flex-wrap: wrap;
  justify-content: center;
  background-color: #3a0131;
  border-radius: 10px;
  overflow-x: hidden;
  ::-webkit-scrollbar {
    display: none;
  }
`;
const CityContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 40px;
  margin:30px;
  flex: 1;
  background-color: #802f57;
  border-radius: 10px;
`;
const CityName = styled.div`
  font-size: 50px;
  color: #3a0131;
  text-align: center;
  padding-bottom: 10px;
  padding-top: 10px;
  font-weight: bold;
`;
const DateContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding-bottom: 10px;
`;
const Date = styled.div`
  font-size: 20px;
`;
const WeatherContainer = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid;
  border-color: black;
  margin-bottom: 20px;
`;
const WeatherTitle = styled.div`
  font-size: 24px;
  color: #3a0131;
  font-weight: bold;
`;
const WeatherTemp = styled.div`
  font-size: 20px;
`;
const Temprature = styled.div`
  font-size: 40px;
  color: #3a0131;
  font-weight: bold;
  text-align: center;
  padding-bottom: 10px;
`;

const Select = styled.select`
  padding: 10px;
  height: 40px;
  border: none;
  font-size: 18px;
  font-weight: 600;
  width: auto;
  background-color: #f4f0f0;
  color: #3a0131;
  background-color: #e8b2cd;
  border-radius: 10px;
`;
const Option = styled.option``;
const Icon = styled.img`
  align-self: center;
  max-width: fit-content;
  max-height: fit-content;
`;

const Deneme = () => {
  const effect = useRef(false);
  const {
    city,
    setCity,
    getWeather,
    weather,
    apiKey,
    day,
    setDay,
    createDate,
  } = useContext(WeatherContext);

  useEffect(() => {
    if (effect.current === false) {
      return () => {
        effect.current = true;
      };
    } else {
      getWeather(city, apiKey);
      setDay((prev) => 0);
    }
  }, [city]);

  const handleChange = (e) => {
    setCity((prev) => cities[e.target.value]);
  };

  return (
    <Container>
      <CityContainer>
        <Select onChange={handleChange}>
          {cities.map((item, index) => (
            <Option key={index} value={index}>
              {item.name}
            </Option>
          ))}
        </Select>
        <CityName>{city?.name}</CityName>
        <DateContainer>
          <Date>{createDate(weather?.daily[day].dt, "long")}</Date>
          <Date>{createDate(weather?.daily[day].dt)}</Date>
        </DateContainer>
        <Icon
          src={`http://openweathermap.org/img/wn/${weather?.daily[day].weather?.[0].icon}@2x.png`}
        />
        <Temprature>{weather?.daily[day].temp.day} C°</Temprature>
        <WeatherContainer>
          <WeatherTitle>Day</WeatherTitle>
          <WeatherTemp>{weather?.daily[day].feels_like.day}</WeatherTemp>
        </WeatherContainer>
        <WeatherContainer>
          <WeatherTitle>Night</WeatherTitle>
          <WeatherTemp>{weather?.daily[day].feels_like.night}</WeatherTemp>
        </WeatherContainer>
        <WeatherContainer>
          <WeatherTitle>Humidity</WeatherTitle>
          <WeatherTemp>{weather?.daily[day].humidity}</WeatherTemp>
        </WeatherContainer>
        <WeatherContainer>
          <WeatherTitle>Windy</WeatherTitle>
          <WeatherTemp>{weather?.daily[day].wind_speed}</WeatherTemp>
        </WeatherContainer>
      </CityContainer>
      <DailyWeatherContainer>
        {weather &&
          weather.daily.map((item, i) => (
            <DailyWeather key={i} daily={item} count={i} />
          ))}
      </DailyWeatherContainer>
    </Container>
  );
};

export default Deneme;
