const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

window.fetch = jest.fn(fetchSimulator);

describe('1 - Teste a função fetchProducts', () => {
  test('testa se a fetchProducts é uma função', async () => {
    fetchProducts(fetch, 'computador');
    expect(fetch).toHaveBeenCalled();
  });

  test('testa se a função fetch foi chamada com o parametro "computador"', () => {
    fetchProducts(fetch, 'computador')
    const url = `https://api.mercadolibre.com/sites/MLB/search?q=computador`;
    expect(window.fetch).toHaveBeenCalledWith(url);
  })

  test('testa se a função lança um erro se não for passado os parâmetros', async () => {
    try {
      await fetchProducts();
    } catch (error) {
      expect(error).toEqual(new Error('You must provide an url'));
    }     
  });

});
