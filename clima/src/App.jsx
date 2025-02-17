import { useState, useEffect } from 'react';
import axios from 'axios';

import Busca from './components/Busca';
import ClimaAtual from './components/ClimaAtual.jsx'; 
import Previsao from './components/Previsao';

import { ClimaContainer, Titulo } from './AppStyles';

const App = () => {
  const [cidade, setCidade] = useState("");
  const [clima, setClima] = useState(null);
  const [previsao, setPrevisao] = useState([]);

  const apiKey = import.meta.env.VITE_API_KEY;

  if (!apiKey) {
    console.error("Erro: Chave da API não definida.");
  }

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        try {
          const resposta = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=pt`
          );

          setCidade(resposta.data.name);
          setClima(resposta.data);
        } catch (error) {
          console.log("Erro ao buscar clima pelo GPS:", error);
        }
      },
      (error) => {
        console.log("Erro ao obter localização:", error);
      }
    );
  }, [apiKey]);

  const buscarClima = async () => {
    try {
      const respostaClima = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${apiKey}&units=metric&lang=pt`
      );

      const respostaPrevisao = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${cidade}&appid=${apiKey}&units=metric&lang=pt`
      );

      setClima(respostaClima.data);
      setPrevisao(respostaPrevisao.data.list.slice(0, 5));
    } catch (error) {
      console.log("Erro ao buscar clima:", error);
    }
  };

  return (
    <ClimaContainer>
      <Titulo>Condições Climáticas</Titulo>
      <Busca propsCidade={cidade} propsSetCidade={setCidade} propsClima={buscarClima} />
      {clima ? <ClimaAtual clima={clima} /> : "Sem informações disponíveis"}
      {previsao.length > 0 && <Previsao propsPrevisao={previsao} />}
    </ClimaContainer>
  );
}

export default App;

