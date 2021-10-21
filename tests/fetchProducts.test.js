const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

window.fetch = jest.fn(fetchSimulator);

describe('1 - Teste a função fecthProducts', () => {
  it('Testa se fecthProducts é uma function', () => {
    expect(typeof fetchProducts).toBe('function');
  })
  it('Testa se fetchProducts foi Chamada', () => {
    fetchProducts('computador')
    expect(fetch).toHaveBeenCalled()
  })
  it('Testa se fetch consumiu o endpoint correto', () => {
    const endPoint = 'https://api.mercadolibre.com/sites/MLB/search?q=computador';
    fetchProducts('computador');
    expect(fetch).toHaveBeenCalledWith(endPoint);
  })
  it('Testa se o retorno de fecthProducts é igual a estrutura de computadorSearch', async() => {
    const result = await fetchProducts('computador');
    expect(result).toEqual(computadorSearch);
  })
  it('Testa a função fetchProducts sem argumento, retorna um erro com a mensagem: You must provide an url', async() => {
    const error = new Error('You must provide an url');
    const result = await fetchProducts();
    expect(result).toEqual(error);
  })
});
