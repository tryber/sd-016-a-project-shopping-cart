const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

window.fetch = jest.fn(fetchSimulator);

describe('1 - Teste a função fecthProducts', () => {
  // implemente seus testes aqui
  it('Verifica se a função fetchProducts retorna o objeto JSON listado abaixo', () => {
    expect(typeof fetchProducts).toBe('function');
  });
  it('Verifica se a função "fetch" foi chamada', async () => {
    expect.assertions(1);
    await fetchProducts('computador');
    expect(fetch).toHaveBeenCalled();
  });
  it('Verifica se a função "fetch" foi chamada com o endpoint corretamente', async () => {
    expect.assertions(1);
    await fetchProducts('computador');
    expect(fetch).toHaveBeenCalledWith(`https://api.mercadolibre.com/sites/MLB/search?q=computador`);
  });
  it('Verifica o resultado da função "fetchProducts"', async () => {
    expect.assertions(1);
    expect(await fetchProducts('computador')).toEqual(computadorSearch);
  })
  it('Verifica se função "fetchProducts", quando chamada sem argumentos, retorna o erro "You must provide an url"', async () => {
    const expectedError = new Error('You must provide an url');
    const result = await fetchProducts();
    expect(result).toEqual(expectedError);
  })
});
