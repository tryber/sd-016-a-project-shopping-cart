const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

window.fetch = jest.fn(fetchSimulator);

describe('1 - Teste a função fecthProducts', () => {

  it('fetchProducts deve ser uma função', () => {
    expect(typeof fetchProducts).toBe('function');
  });

  it('fetch Deve ser chamado em fetchProducts', () => {
    fetchProducts('computador');
    expect(fetch).toHaveBeenCalled();
  })

  it('Testa se fetch esta buscando os dados no endpoint correto', () => {
    const correctEndpoint = `https://api.mercadolibre.com/sites/MLB/search?q=computador`;
    fetchProducts('computador');
    expect(fetch).toHaveBeenCalledWith(correctEndpoint);
  });

  it('o retorno de fetchProducts deve ser igual ao objeto esperado', async () => {
    const returnedObj = await fetchProducts('computador');
    expect(returnedObj).toEqual(computadorSearch);
  });

  it('Deve retornar o Erro específico', async () => {
    const expectedError = new Error('You must provide an url');
    const errorReturned = await fetchProducts();
    expect(errorReturned).toEqual(expectedError);
  })

});
