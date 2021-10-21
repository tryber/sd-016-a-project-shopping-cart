const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

window.fetch = jest.fn(fetchSimulator);

describe('1 - Teste a função fecthProducts', () => {
  it('Verificar se deve ser uma função', () => {
    expect(typeof fetchProducts).toBe('function');
  });
  it('Verifica se passar o parametro computador , fetchProducts é chamada', () => {
    fetchProducts('computador');
    expect(fetch).toHaveBeenCalled();
  });
  it('Verifica se passar o parametro computador , fetchProducts é chamada com endpoint npm ', () => {
  const endpoint = ('https://api.mercadolibre.com/sites/MLB/search?q=computador')
  fetchProducts('computador');
  expect(fetch).toHaveBeenCalledWith(endpoint);
  });
  it('Verifica se o retorno da função é um objeto igaul a computadorSearch', async () => {
   const results = await fetchProducts('computador');
   expect(results).toEqual(computadorSearch);
  });
  it('Verifica o retorno de um erro', async () => {
    const expectedError = new Error('You must provide an url');
    const results2 = await fetchProducts();
    expect(results2).toEqual(expectedError);
  });
});
