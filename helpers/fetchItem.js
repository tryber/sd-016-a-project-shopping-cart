const fetchItem = (id) => {
  // seu código aqui
  const getId = `https://api.mercadolibre.com/items/${id}`;
  const getIdProduct = fetch(getId)
    .then((response) => response.json())
    .then((data) => (data));
  return getIdProduct;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
