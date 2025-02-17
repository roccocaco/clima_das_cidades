import PropTypes from 'prop-types';
import { BotaoBuscar, BuscaCidade, BuscaContainer } from "./BuscaStyles";

const Busca = ({ propsCidade, propsSetCidade, propsClima }) => {
  return (
    <BuscaContainer>
      <BuscaCidade
          type="text"
          value={propsCidade}
          onChange={(e) => propsSetCidade(e.target.value)}
          placeholder="Digite uma cidade..."
        />
        <BotaoBuscar onClick={propsClima}>Buscar</BotaoBuscar>
    </BuscaContainer>
  );
};

Busca.propTypes = {
  propsCidade: PropTypes.string.isRequired,
  propsSetCidade: PropTypes.func.isRequired,
  propsClima: PropTypes.func.isRequired,
};

export default Busca;