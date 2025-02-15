import { useState, useEffect } from 'react';
import axios from 'axios';

import Busca from './components/Busca';
import ClimaAtual from './components/ClimaAtual';
import Previsao from './components/Previsao';

import { Titulo } from './AppStyles';

const App = () => {
  const [cidade, setCidade] = useState("");
  const [clima, setClima] =  useState(null);
  const [previsao, setPrevisao] = useState([]);

  const apiKey =import.meta.env.VITE_API_KEY || "";

  useEffect(() => {

    navigator.geolocation.getCurrentPosition(async (position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;

      const resposta = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon${lon}&appid=${apiKey}`
        );

        setCidade(resposta.data.name);
        setClima(resposta.data);
    });

  }, [apiKey])

  const buscarClima = async() => {
    try {

      const respostaClima = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${apiKey}`
      );

      const respostaPrevisao = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${cidade}&appid=${apiKey}`
      );

      setClima(respostaClima.data);

      setPrevisao(respostaPrevisao.data.list.slice(0, 5));
    } catch (error) {
      console.log("Error ao buscar clima: ", error)
    }
  };

  return (
    <div>
      <Titulo>Weather conditions</Titulo>
      <Busca propsCidade={cidade} propsSetCidade={setCidade} propsClima={buscarClima}/>
      {clima ? <ClimaAtual clima={clima}/> : "no conditions"}
      {previsao.length> 0 && <Previsao propPrevisao={previsao} />}
    </div>
  );
}

export default App
