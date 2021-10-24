const fetchItem = async (sku) => {
  // seu código aqui
  const response = await fetch(`https://api.mercadolibre.com/items/${sku}`);
  const data = await response.json();
  const { id, title, price } = data;
  const formatedData = { sku: id, name: title, salePrice: price };
  return formatedData;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
