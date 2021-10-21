const fetchProducts = async (item) => {
  // o computador já está indicado na url, logo, nao foi usado quando chamada a funcão
  const url = `https://api.mercadolibre.com/sites/MLB/search?q=${item}`;
  const result = await fetch(url);
  // é possível dar um return já de 
  // console.log(results)
  const data = await result.json();
  // retorna uma promise
  return data.results
};

// fetchProducts('computador')
// // acessando diretamente o results
//   .then((data) => console.log(data.results));

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
