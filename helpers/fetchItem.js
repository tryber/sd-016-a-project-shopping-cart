const fetchItem = async (idItem) => {
  const API_URL = `https://api.mercadolibre.com/items/${idItem}`;
   const response = await fetch(API_URL);
   const data = await response.json();
   return data;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
