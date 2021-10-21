const fetchItem = (ItemID) => {
  // seu código aqui
  const result = fetch(`https://api.mercadolibre.com/items/${ItemID}`)
    .then((response) => response.json());
    console.log(result);
    return result;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
