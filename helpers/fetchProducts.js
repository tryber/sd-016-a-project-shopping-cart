const fetchProducts = (product) => {
  // seu código aqui

  const mesageErro = new Error('You must provide an url');
  if (!product) return mesageErro.message;
  const promise = `https://api.mercadolibre.com/sites/MLB/search?q=${product}`;
  const result = fetch(promise)
    .then((response) => response.json())
    .then((data) => data);

  return result;
}

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
