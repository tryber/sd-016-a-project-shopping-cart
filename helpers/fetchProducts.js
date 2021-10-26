const fetchProducts = async (item) => {
  // o computador já está indicado na url, logo, nao foi usado quando chamada a funcão
  const url = `https://api.mercadolibre.com/sites/MLB/search?q=${item}`;
  return fetch(url)
    .then((data) => data.json())
    // linha com error e ideia de remover as linhas comentadas feitas durante a sala de estudos
    // seguindo a sugestão do Brunão
    .catch((err) => err);
  // retorna uma promise
  // return data.results;
};

// fetchProducts('computador')
// // acessando diretamente o results
//   .then((data) => console.log(data.results));

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
