const fetchItem = async (itemID) => {
  try {
    const url = `https://api.mercadolibre.com/items/${itemID}`;
    const productResult = await fetch(url);
    const productData = await productResult.json();
    
    return productData;
  } catch (error) {
    return error;
  }
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
