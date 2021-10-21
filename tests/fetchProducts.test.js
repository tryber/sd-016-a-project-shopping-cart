const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

window.fetch = jest.fn(fetchSimulator);

describe('1 - Teste a função fetchProducts', () => {
  test('testa se a fetchProducts é uma função', async () => {
    expect(typeof fetchProducts).toBe('function');
  });

  test('testa se a função fetch foi chamada com o parametro "computador"', () => {
    fetchProducts('computador');
    expect(fetch).toHaveBeenCalled();
  })

  test('ao chamar a função fetchProducts com o argumento "computador", a função fetch utiliza o endpoint', () => {
    const endPoint = "https://api.mercadolibre.com/sites/MLB/search?q=computador";
    fetchProducts('computador');
    expect(fetch).toHaveBeenCalledWith(endPoint);
  });

  test('se o retorno da função fetchProducts com o argumento "computador" é uma estrutura de dados igual ao objeto computadorSearch', async () => {
    const results = await fetchProducts('computador');
    expect(results).toEqual(computadorSearch);
  });

  test('testa se a função lança um erro se não for passado os parâmetros', async () => {
    try {
      await fetchProducts();
    } catch (error) {
      expect(error).toEqual(new Error('You must provide an url'));
    }     
  });

});
