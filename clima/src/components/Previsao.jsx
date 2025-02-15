const Previsao = ({ propPrevisao }) => {
  return (
    <div>
      <h4>Forecast for the next few hours</h4>
      <ul>
        {propPrevisao.map((Previsao) => (                    
        <li previsao={Previsao.dt}>
          <img 
            src={`http://openweathermap.org/img/wn/${Previsao.weather[0].icon}.png`} 
            alt={Previsao.weather[0].description}
          />
            {Previsao.main.temp}°C - {Previsao.weather[0].description}
        </li>
        ))}
      </ul>
    </div>
  );
};

export default Previsao
