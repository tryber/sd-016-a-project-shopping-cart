const fetchProducts = (item) => {
  if (!item) {
    throw new Error('You must provide an url');
  }
  const promessa = fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${item}`);
  const promesaJson = promessa.then((dado) => dado.json());
  const resultado = promesaJson.then((resultadoPromessa) => resultadoPromessa.results);
  return resultado;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
