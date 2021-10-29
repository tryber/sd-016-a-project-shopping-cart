const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

window.fetch = jest.fn(fetchSimulator);

describe('1 - Teste a função fecthProducts', () => {
  it('teste se a função fetchProducts é uma função', () => {
    expect(typeof fetchProducts).toBe('function');
  })

  it('teste se fetch foi chamada ao executar a funçãor fetchProducts', () => {
    fetchProducts('computador');
    expect(fetch).toHaveBeenCalled();
  })

  it('teste se ao chamar a função com o argumento computador, a função utiliza o endpoint correto', () => {
    const endpoint = 'https://api.mercadolibre.com/sites/MLB/search?q=computador';
    fetchProducts('computador');
    expect(fetch).toHaveBeenCalledWith(endpoint);
  })

  it('teste se o retorno da função é uma estrutura de dados igual ao objeto computadorSearch', async () => {
    const result = await fetchProducts('computador');
    expect(result).toEqual(computadorSearch);
  })

  it('teste se quando a função é chamada sem parametro, é retornado uma mensagem de erro', async () => {
    const error = new Error('You must provide an url');
    const result = await fetchProducts();
    expect(result).toEqual(error);
  })
});
