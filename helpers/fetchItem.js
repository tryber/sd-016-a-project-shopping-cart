const fetchItem = async (id) => {
  const endpoint = `https://api.mercadolibre.com/items/${id}`;

  try {
    const response = await fetch(endpoint);
    const data = await response.json();
    
    console.log(data);
  } catch (error) {
    console.log('Erro na função fetchItem: ', error);
  }
};

fetchItem('MLB1341706310');

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
