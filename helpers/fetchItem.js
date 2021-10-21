const fetchItem = async (id) => {
  const productId = await fetch(`https://api.mercadolibre.com/items/${id}`)
  .then((result) => result.json());

  return productId;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
