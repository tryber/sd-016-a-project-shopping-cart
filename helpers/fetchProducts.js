const fetchProducts = async () => {
  // seu código aqui
  const response = await fetch(
    'https://api.mercadolibre.com/sites/MLB/search?q=$computador',
  );
  const data = await response.json();
  return data;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
