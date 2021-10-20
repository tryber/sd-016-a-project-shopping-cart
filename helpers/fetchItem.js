const fetchItem = async (id) => {
  const url = `https://api.mercadolibre.com/items/${id}`;
  const datas = fetch(url);
  const values = await datas.then((data) => data.json());
  return values;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
