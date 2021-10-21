const fetchProducts = (products) => {
  const productsUrl = `https://api.mercadolibre.com/sites/MLB/search?q=${products}`;
  return fetch(productsUrl)
    .then((resposta) => resposta.json())
    .then((data) => data.results);
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}

// const nome = document.querySelector('#nomeDoId')
// const name2 = document.createElement('li')
// nome.appendChild(name2);
// name2.innerText = ;