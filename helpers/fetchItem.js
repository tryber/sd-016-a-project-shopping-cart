const fetchItem = async (itemID) => {
  if (!itemID) {
    return new Error('You must provide an url');
  }
  const item = await fetch(`https://api.mercadolibre.com/items/${itemID}`)
    .then((data) => data.json());
  
  return item;
};

/* return new Promise((resolve, reject) => {
  fetch(`https://api.mercadolibre.com/items/${itemID}`)
  .then(async (data) => {
    const item = await data.json();
    resolve({
      sku: item.id,
      name: item.title,
      image: item.thumbnail,
      salePrice: item.price,
    });
  })
  .catch((error) => {
    reject(error);
  });
}); */

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
