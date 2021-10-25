const fetchItem = async (sku) => {
  const url = `https://api.mercadolibre.com/items/${sku}`;

  if (!sku || sku.length === undefined) {
    throw new Error('You must provide an url');
  }  

  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error('Algo de inesperado aconteceu, tente novamente mais tarde!');
  }  
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
