const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

window.fetch = jest.fn(fetchSimulator);

describe('1 - Teste a função fecthProducts', () => {
  // logicas do tio BE
  it('Testa se é uma funcão', () => {
    expect(typeof fetchProducts).toBe('function');
  });
  it('Testa se foi chamada', () => {
    fetchProducts('computador');
    expect(fetch).toHaveBeenCalled();
  });
  it('Testa se foi chamada com o endpoint correto', () => {
    const endpoint = 'https://api.mercadolibre.com/sites/MLB/search?q=computador'
    fetchProducts('computador');
    expect(fetch).toHaveBeenCalledWith(endpoint); // falso positivo por causa do mock
  });
  it('testa se reporto é igual a computador', async () => {
    const resultado = await fetchProducts('computador');
    return expect(resultado).toEqual(computadorSearch);
  });
  it('verificar se retorna erro', async () => {
    const resultado = await fetchProducts();
    const err = new Error('You must provide an url');
    expect(resultado).toEqual(err);
  });
});
