const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

window.fetch = jest.fn(fetchSimulator);

describe('1 - Teste a função fecthProducts', () => {
  it('Verifica se é um função', () => {
    expect(typeof fetchProducts).toBe('function');
  });

  it('Verifica se é chamada um fetch', () => {
    fetchProducts('computador')
    expect(fetch).toHaveBeenCalled();
  });

  it('Verifica se ao chamar a função com o argumento "computador", a função fetch utiliza o endpoint do ML', () => {
    const endpointML = 'https://api.mercadolibre.com/sites/MLB/search?q=computador'
    fetchProducts('computador')
    expect(fetch).toHaveBeenCalledWith(endpointML);
  });

  it('Verifica se o retorno é uma estrutura de dados igual ao objeto computadorSearch', async () => {
    const fetchAPI = await fetchProducts('computador');
    expect(fetchAPI).toEqual(computadorSearch);
  });

  it('Verifica se ao chamar a função sem argumento, retorna um erro com a mensagem: You must provide an url', async () => {
    const fetchAPI = await fetchProducts();
    const error = new Error('You must provide an url');
    expect(fetchAPI).toEqual(error);
  });
});
