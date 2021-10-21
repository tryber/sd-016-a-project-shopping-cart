const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

window.fetch = jest.fn(fetchSimulator);

describe('1 - Teste a função fecthProducts', () => {
  // implemente seus testes aqui
  it('Verifica se fetchProducts é uma função', () => {
    expect(typeof fetchProducts).toBe('function');
  });
  it('Verifica se fetch foi chamada na função fetchProducts com argumento computador', async () => {
    await fetchProducts('computador');
    expect(fetch).toHaveBeenCalled();
  });
  it('Verifica se o endpoint utilizado está correto', async () => {
    await fetchProducts('computador');
    expect(fetch).toHaveBeenCalledWith('https://api.mercadolibre.com/sites/MLB/search?q=computador');
  });
  it('Verifica se o retorno da função fetchProducts com o argumento computador é igual ao objeto computadorSearch', async () => {
    const computers = await fetchProducts('computador');
    expect(computers).toEqual(computadorSearch.results);
  });
  it('Verifica se ao chamar a função fetchProducts sem argumento, retorna uma mensagem de erro', () => {
    expect(fetchProducts).toThrow(new Error('You must provide an url'));
  });
});
