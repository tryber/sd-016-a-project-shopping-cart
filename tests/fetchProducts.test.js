const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

window.fetch = jest.fn(fetchSimulator);

describe('1 - Teste a função fecthProducts', () => {
  // implemente seus testes aqui
  it('Testa se fetchProducts é uma função', async () => {
    expect.assertions(1);
    expect(typeof fetchProducts).toBe('function');
  });

  it('Testa se fetch é chamado ao buscar por computador na fetchProducts', async () => {
    expect.assertions(1);
    await fetchProducts('computador');
    expect(fetch).toHaveBeenCalled();
  });

  it('Testa se fetch utiliza o termo computador na endpoint', async () => {
    expect.assertions(1);
    const expectedFetch = 'https://api.mercadolibre.com/sites/MLB/search?q=computador';
    await fetchProducts('computador');
    expect(fetch).toHaveBeenCalledWith(expectedFetch);
  });

  it('Testa se fetchProducts retorna a estrutura de dados correta', async () => {
    expect.assertions(1);
    const fetchReturn = await fetchProducts('computador');
    expect(fetchReturn).toEqual(computadorSearch);
  });

  it('Testa se ao chamar a função fetchProducts sem argumentos um erro pré-definido é lançado', async () => {
    expect.assertions(1);
    const throwTest = await fetchProducts();
    expect(throwTest).toEqual(new Error ('You must provide an url'));
  });
});
