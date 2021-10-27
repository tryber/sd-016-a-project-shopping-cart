const fetchItem = async (sku) => {
  // seu código aqui
  try { 
    const binaryRes = await fetch(`https://api.mercadolibre.com/items/${sku}`);
    const transformJSON = await binaryRes.json();
    return transformJSON;
  } catch (error) {
    return error;
  }
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
