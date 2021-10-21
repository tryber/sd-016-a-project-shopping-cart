const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

window.fetch = jest.fn(fetchSimulator);

describe('1 - Teste a função fecthProducts', () => {
  test ('Se fetchProducts é uma função', () => {
    expect(typeof fetchProducts).toEqual('function')
  });

  test ('Se fetch é chamada caso chamado a função fetchProducts(computador)', () => {
    fetchProducts('computador');
    expect(fetch).toHaveBeenCalled();
  }); 

  test ('Se ao chamar fetchProducts(computador) a função usa o endpoint especificado', () => {
    const endpoint =  "https://api.mercadolibre.com/sites/MLB/search?q=computador";
    expect(fetch).toHaveBeenCalledWith(endpoint)
  })

  test('Se ao chamar fetchProducts(computador) retorna um objeto igual ao computadorSearch', async () => {
    const functionFetch = await fetchProducts('computador');
    expect(functionFetch).toMatchObject(computadorSearch);
  })

  test('Se ao chamar a função sem parametro retorna um erro', async () => {
    try {
      await fetchProducts();
    } catch (error) { 
      expect(error).toEqual(new Error('You must provide an url'));
    }
  })

});
