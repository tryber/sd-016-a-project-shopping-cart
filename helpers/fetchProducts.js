// 1- Buscando endpoint com o fetch de forma dinâmica.
// 2- Espera o resultado da busca da api ficar pronto com o then
// e ela retornar algo em formato json.
// 3- Caso a requisição da api falhe, usa o catch.
// 4- A função fetch precisa ser retornada.
function fetchProducts(product) {
  return fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${product}`)
    .then((data) => data.json())
    .catch((error) => error);
}

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
