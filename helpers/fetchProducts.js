const fetchProducts = async (item) => {
  // seu código aqui
  try {
    const binaryRes = await fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${item}`);
    const responseJSON = await binaryRes.json();
    const resultOfItems = await responseJSON;
    return resultOfItems;  
  } catch (error) {
    return error;
  }
};

fetchProducts();

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
