const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');
window.fetch = jest.fn(fetchSimulator);

describe('1 - Teste a função fecthProducts', () => {
  it ('Testa se fetchProducts é uma função', async () => {
    expect(typeof fetchProducts).toBe('function');
  });

  it ('Testa se fetch foi chamada, ao passar "computador" como argumento para fetchProducts', async () => {
    await fetchProducts('computador');
    expect(fetch).toHaveBeenCalled();
  });

  it ('Testa se fetch recebe a url correta', async () => {
    await fetchProducts('computador');
    expect(fetch).toHaveBeenCalledWith('https://api.mercadolibre.com/sites/MLB/search?q=computador');
  });

  it ('Testa se o retorno de fetchProducts("computador") é igual ao objeto computadorSearch', async () => {
    const productData = await fetchProducts('computador');
    expect(productData).toMatchObject(computadorSearch.results);
  });

  it ('Testa se ao chamar fetchProducts sem argumentos, retorna um erro', async () => {
    const expectedError = new Error('You must provide an url');
    const productData = await fetchProducts();
    expect(productData).toEqual(expectedError);
  })
});