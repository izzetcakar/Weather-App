import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import WeatherContext from "../Context/WeatherContext";

const Container = styled.div`
  background-color: #802f57;
  height: fit-content;
  border-radius: 10px;
  min-width: 200px;
  margin: 30px;
  cursor: pointer;
  flex-direction: column;
  display: flex;
  color: #3a0131;
  font-weight: bold;
`;
const Date = styled.div`
  padding: 8px;
  font-size: 20px;
  text-align: center;
  border-bottom: 2px solid white;
`;
const Title = styled.div`
  font-size: 20px;
  text-align: center;
  margin: 10px;
`;
const TempratureContainer = styled.div`
  display: flex;
  justify-content: space-around;
  background-color: #e8b2cd;
  border-bottom-left-radius: 9px;
  border-bottom-right-radius: 9px;
  padding: 10px;
`;
const Temprature = styled.div``;
const Icon = styled.img`
  align-self: center;
  max-width: fit-content;
  max-height: fit-content;
`;

const DailyWeather = ({ daily, count }) => {
  const { setDay, createDate } = useContext(WeatherContext);

  const handleDayChange = (newDay) => {
    setDay((prev) => newDay);
  };

  return (
    <Container onClick={() => handleDayChange(count)}>
      {daily && count < 7 && (
        <>
          <Date>{createDate(daily?.dt, "long")}</Date>
          <Icon
            src={`http://openweathermap.org/img/wn/${daily?.weather?.[0].icon}@2x.png`}
          />
          <Title>{createDate(daily?.dt)}</Title>
          <Title>{daily?.weather[0].description}</Title>
          <TempratureContainer>
            <Temprature>Min: {daily?.temp.min}</Temprature>
            <Temprature>Max: {daily?.temp.max}</Temprature>
          </TempratureContainer>
        </>
      )}
    </Container>
  );
};

export default DailyWeather;
