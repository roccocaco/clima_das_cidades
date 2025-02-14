const Busca = ({propsCidade, propsSetCidade, propsClima}) => {
  return (
    <div>
      <input 
      type="text" 
      value={propsCidade}
      onChange={(e) => propsSetCidade(e.target.value)} 
      placeholder="Digite uma cidade..."
      />
      <button onClick={propsClima}>Buscar</button>
    </div>
  );
};

export default Busca;
