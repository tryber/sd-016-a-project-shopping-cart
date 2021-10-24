const fetchItem = async (idProduct) => {
  const response = await fetch(`https://api.mercadolibre.com/items/${idProduct}`);
  return response.json();
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
