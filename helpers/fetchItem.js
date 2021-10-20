const fetchItem = async (query) => {
  const url = `https://api.mercadolibre.com/sites/MLB/search?q=${query}`;
  const datas = fetch(url);
  const values = await datas.then((data) => data.json()).then((value) =>
    value.results).catch((error) => console.log(error));
  return values;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
