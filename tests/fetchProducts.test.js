// requisito executado com o auxilio do vídeo de Bernando e mentoria de Humberto Castro
const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

window.fetch = jest.fn(fetchSimulator);

describe('1 - Teste a função fecthProducts', () => {
  
  test('deve ser uma função', () => {
    expect(typeof fetchProducts).toBe('function')
  });

  test('ao chamar o argumento computador,fetch é chamada', () => {
    fetchProducts('computador');
    expect(fetch).toHaveBeenCalled();
  });

  test('ao chamar com o argumento computador, verificar se fecht foi chamada com endpoint correto', () => {
    const endpoint = 'https://api.mercadolibre.com/sites/MLB/search?q=computador';
    fetchProducts('computador');
    expect(fetch).toHaveBeenCalledWith(endpoint);
  });

  test('se o retorno é um objeto igual à computadorSearch', async () => {
    const results = await fetchProducts('computador');
    expect(results).toEqual(computadorSearch);
  });

  test('ao chamar a função sem argumento deve retornar error', async () => {
    const expectError = new Error('You must provide an url');
    const result = await fetchProducts();
    expect(result).toEqual(expectError);
  });
});
