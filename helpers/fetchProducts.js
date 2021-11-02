/* 
  fetch()-> Função Assíncrona, primária, baseada em promise usada em requisições http. Função primária, utilizada para fazer chamadas às URL's das APIs
  
  Promise é um objeto usado para processamento assíncrono. Um Promise (de "promessa") representa um valor que pode estar disponível agora, no futuro ou nunca. ... O construtor é utilizado para embrulhar funções sem suporte ao conceito "promise".

  Parâmetros: são os nomes dados aos atributos que uma função pode receber. Definem quais argumentos são aceitos por uma função, pode ou não ter um valor padrão (default). Argumentos: são os valores que realmente são passados para uma função. 
*/
const fetchProducts = (products) => {
  // Colocar endereço de onde vai tirar os dados,lista de produtos API com a fç fetch
  // ${products} -> Termo a ser buscado no motor de busca
  
  return fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${products}`)
    // Resposta da API em arq de dados JSON
    // Pode ou não retornar um erro
    .then((data) => data.json()) // Espera o resultado da função e retorna json
    .catch((error) => error); // Se ocorre algum erro e recebe outra função como parâmetro
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}