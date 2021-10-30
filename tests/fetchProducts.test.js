const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

window.fetch = jest.fn(fetchSimulator);

describe('1 - Teste a função fecthProducts', () => {
  // implemente seus testes aqui
  it('1 - Testa se realmente é uma função', () => {
    expect(typeof fetchProducts).toBe('function');
  });

  it('2 - Testa se fetch foi chamada após execução da função fetchProducts', () => {
    fetchProducts('computador');
    expect(fetch).toHaveBeenCalled();
  });

  it('3 - Testa se ao chamar a função fetchProducts com o argumento \'computador\' retorna o endpoint correto', () => {
    const correctEndPoint = "https://api.mercadolibre.com/sites/MLB/search?q=computador";

    fetchProducts('computador');
    expect(fetch).toHaveBeenCalledWith(correctEndPoint);
  });

  it('Testa se o retorno da função fetchProducts com o argumento \'computador\' é igual a estrutura de dados do objeto computadorSearch', () => {
    fetchProducts('computador')
      .then((data) => expect(data).toEqual(computadorSearch));
  });

  it('5 Testa se ao chamar a função fetchProducts, retorna um erro com a mensagem \'You must provide an url\'.', () => {
    expect(() => fetchProducts()).toThrow(/^You must provide an url$/);
  })
});
