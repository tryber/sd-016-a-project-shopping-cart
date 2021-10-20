const fetchProducts = async (callback, query) => {
  const url = `https://api.mercadolibre.com/sites/MLB/search?q=${query}`;
  try {
    const datas = await callback(url);
    const values = await datas.json().then((value) => value);
    return values.results;
  } catch (error) {
    throw new Error('You must provide an url');
  }
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
