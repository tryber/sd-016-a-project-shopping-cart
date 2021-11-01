const fetchItem = async (sku) => {
  // seu código aqui
  try {
    const response = await fetch(`https://api.mercadolibre.com/items/${sku}`);
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
