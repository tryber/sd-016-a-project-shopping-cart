const fetchProducts = async (arg) => {
  // seu código aqui
  try {
    const response = await fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${arg}`);
    const data = await response.json();
    const itemsSection = document.querySelector('.items');
    await data.results.forEach((element) => {
    const { id, title, thumbnail } = element;
    console.log(id, title, thumbnail);
    itemsSection.appendChild(createProductItemElement({ id, title, thumbnail }));
    });
  } catch(error) {
    window.alert('404 NOT FOUND');
  }
}

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
