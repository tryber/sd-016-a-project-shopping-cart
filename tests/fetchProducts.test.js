const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

window.fetch = jest.fn(fetchSimulator);

describe('1 - Teste a função fecthProducts', () => {

  it('Testa se é uma função', () => {
    expect(typeof fetchProducts).toEqual('function');
  });
  
  it('Ao passar computador como argumento, testa se a função fetch é chamada', () => {
    fetchProducts('computador');
    expect(fetch).toHaveBeenCalled();
  });

  it('Ao passar computador como argumento, testa se a função fetch utiliza o end points https://api.mercadolibre.com/sites/MLB/search?q=computador', () => {
    fetchProducts('computador');
    expect(fetch).toHaveBeenCalledWith('https://api.mercadolibre.com/sites/MLB/search?q=computador');
  });

  it('Ao passar computador como argumento, testa se o retorno é igual à computadorSearch'  , async () => {
    expect(await fetchProducts('computador')).toEqual(computadorSearch);
  });

  it('Ao chamar a função sem argumento, retorna um erro com a mensagem: You must provide an url', async () => {
    expect(await fetchProducts()).toEqual(new Error ('You must provide an url'));
  });
});
