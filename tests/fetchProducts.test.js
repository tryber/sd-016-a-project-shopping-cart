const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

window.fetch = jest.fn(fetchSimulator);

describe('1 - Teste a função fecthProducts', () => {
  it('Verifica se fetchProducts é uma função', () => {
    expect(typeof(fetchProducts)).toBe('function');
  })

  it('Chama a função fetchProducts com o argumento "computador" e testa se fetch foi chamada', ()=> {
    fetchProducts('computador');
    expect(fetch).toHaveBeenCalled();
  })

  it('Chama a função fetchProducts com o argumento "computador", testa se a função fetch utiliza o endpoint correto;', async() => {
    const expectedEndpoint = 'https://api.mercadolibre.com/sites/MLB/search?q=computador';
    fetchProducts('computador');
    expect(fetch).toHaveBeenCalledWith(expectedEndpoint);
  })

  it('Testa se o retorno da função fetchProducts com o argumento "computador" é uma estrutura de dados igual ao objeto computadorSearch.', async() => {
    expect( await fetchProducts('computador')).toBe(computadorSearch);
  })

  it('Chama fetchProducts() sem argumento e testa se retorna um erro.', async done => {
    // expect( () => fetchProducts() ).toThrowError('You must provides an url');
    try {
      await fetchProducts()
      done();
    } catch (error) {
      expect(error).toEqual(new Error('You must provide an url'));
      done();
    };
  })

});
