// fetch()-> Função Assíncrona, primária, baseada em promise usada em requisições http. Função primária, utilizada para fazer chamadas às URL's das APIs
// Promise é um objeto usado para processamento assíncrono. Um Promise (de "promessa") representa um valor que pode estar disponível agora, no futuro ou nunca. ... O construtor é utilizado para embrulhar funções sem suporte ao conceito "promise".
// Parâmetros: são os nomes dados aos atributos que uma função pode receber. Definem quais argumentos são aceitos por uma função, pode ou não ter um valor padrão (default). Argumentos: são os valores que realmente são passados para uma função. 
const fetchProducts = (products) => {
  // Colocar endereço de onde vai tirar os dados,lista de produtos API
  const url = `https://api.mercadolibre.com/sites/MLB/search?q=${products}`;
  return fetch(url) // Retorno -> promise
  // O método then() retorna uma Promise. Possui dois argumentos, ambos são "call back functions", sendo uma para o sucesso e outra para o fracasso da promessa.
  .then((response) => response.json())
  .then((data) => data)
  .catch((error) => error);
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
