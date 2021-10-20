const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

window.fetch = jest.fn(fetchSimulator);

describe('1 - Teste a função fecthProducts', () => {

  it('Testa se é uma função', () => {

    expect(typeof fetchProducts).toBe('function');
  })

  it('Executa a função com o argumento "computador" e testa se fetch foi chamada', () => {

    fetchProducts('computador');
    expect(fetch).toHaveBeenCalled();
  })

  it('Testa se o endpoint de fetch é o esperado com argumento "computador"', () => {

    fetchProducts('computador');
    expect(fetch).toHaveBeenCalledWith("https://api.mercadolibre.com/sites/MLB/search?q=$computador");
  });

  it('Testa se o retorno de fetchProducts com o argumento "computador" é o esperado', async () => {

    fetchProducts("computador")
      .then((res) => expect(res).toEqual(computadorSearch));
  })

  it('Testa se, ao não passar argumentos lança uma exceção', async () => {

    // trecho de código retirado do colega Adran Carnavale
    try {
      await fetchProducts();
    } catch (error) {
      expect(error).toEqual(new Error('You must provide an url'));
    };

  })
});
