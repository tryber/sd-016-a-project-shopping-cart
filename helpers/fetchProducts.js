const fetchProducts = (produto) => {
  // seu código aqui

  const promise = fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${produto}`);
  
  promise.then((response) => response.json());
  promise.then((data) => data);
  
  return promise;
}

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
