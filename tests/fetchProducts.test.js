const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

window.fetch = jest.fn(fetchSimulator);

describe('1 - Teste a função fecthProducts', () => {
  test(('Testa se fetchProducts é uma função'), () => {
    expect(typeof fetchProducts).toBe('function');
  });

  test(('verifica se ao Executar a função fetchProducts com o argumento "computador", verifica se fetch foi chamada'), () => {
    fetchProducts('computador');
    expect(fetch).toHaveBeenCalled();
  });

  test(('Testa se, ao chamar a função fetchProducts com o argumento "computador", a função fetch utiliza o endpoint padrão'), () => {
    const endpoint = 'https://api.mercadolibre.com/sites/MLB/search?q=computador';
    fetchProducts('computador');
    expect(fetch).toHaveBeenCalledWith(endpoint);
  });

  test(('Testa se o retorno da função fetchProducts com o argumento "computador" é uma estrutura de dados igual ao objeto computadorSearch'), async () => {
    const results = await fetchProducts('computador');
    expect(results).toEqual(computadorSearch);
  });

  test(('deve retornar um erro'), async () => {
    const expectErro = new Error('You must provide an url');
    const result = await fetchProducts();
    expect(result).toEqual(expectErro);
  });
});
