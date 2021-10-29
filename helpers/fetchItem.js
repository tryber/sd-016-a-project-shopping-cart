const fetchItem = async (id) => {
  // seu código aqui
  const url = `https://api.mercadolibre.com/items/${id}`;
  const pathItem = await fetch(url)
    .then((response) => response.json())
    .catch((error) => error);
    return pathItem;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
