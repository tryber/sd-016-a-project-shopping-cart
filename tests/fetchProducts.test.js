const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

window.fetch = jest.fn(fetchSimulator);

describe('1 - Teste a função fecthProducts', () => {
  // implemente seus testes aqui
  // fail('Teste vazio');
  it('must be a function', () => {
    expect(typeof fetchProducts).toBe('function');
  });
  // 2 - Execute a função fetchProducts com o argumento "computador" e teste se fetch foi chamada;
  it('fetch must be called', () => {
    fetchProducts('computador');
    expect(fetch).toHaveBeenCalled();
  });
  // 3 - Teste se, ao chamar a função fetchProducts com o argumento "computador", a função fetch utiliza o endpoint "https://api.mercadolibre.com/sites/MLB/search?q=computador";
  it('must use correct endpoint', () => {
    fetchProducts('computador');
    expect(fetch).toHaveBeenCalledWith(
      'https://api.mercadolibre.com/sites/MLB/search?q=computador',
    );
  });
  // 4 - Teste se o retorno da função fetchProducts com o argumento "computador" é uma estrutura de dados igual ao objeto computadorSearch, que já está importado no arquivo.
  it('response from fetchProducts must be equal to computadorSearch object', async () => {
    const response = await fetchProducts('computador');
    expect(response).toEqual(computadorSearch);
  });
  // 5 - Teste se, ao chamar a função fetchProducts sem argumento, retorna um erro com a mensagem: You must provide an url. Dica: Lembre-se de usar o new Error('mensagem esperada aqui') para comparar com o objeto retornado da API.
  it('if fetchProducts is called with no arguments, must return an error', async () => {
    const error = new Error('You must provide an url');
    const response = await fetchProducts();
    expect(response).toEqual(error);
  });
});
