import PropTypes from "prop-types";
import { ClimaInfo } from "./ClimaAtualStyles";

const ClimaAtual = ({ clima }) => {
  return (
    <ClimaInfo>
      <h3>{clima.name}</h3>
      <img 
        src={`http://openweathermap.org/img/wn/${clima.weather[0].icon}.png`} 
        alt={clima.weather[0].description} 
      />
      <p>{clima.main.temp}°C</p>
      <p>{clima.weather[0].description}</p>
    </ClimaInfo>
  );
};

ClimaAtual.propTypes = {
  clima: PropTypes.shape({
    name: PropTypes.string,
    main: PropTypes.shape({
      temp: PropTypes.number,
    }),
    weather: PropTypes.arrayOf(
      PropTypes.shape({
        icon: PropTypes.string,
        description: PropTypes.string,
      })
    ),
  }),
};

export default ClimaAtual;

