const fetchItem = async (idProduct) => {
  const response = await fetch(
    `https://api.mercadolibre.com/items/${idProduct}`
  );
  return await response.json();
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
