const fetchItem = async (id) => {
  const productId = await fetch(`https://api.mercadolibre.com/items/${id}`)
  .then((result) => result.json())
  .catch((error) => error);

  return productId;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
