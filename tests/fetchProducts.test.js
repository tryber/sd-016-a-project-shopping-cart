const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

window.fetch = jest.fn(fetchSimulator);

describe('1 - Teste a função fecthProducts', () => {
  it('Testa se o tipo de fetchProducts é uma função', () => {
    const expected = 'function';
    const result = typeof fetchProducts;

    expect(expected).toBe(result);
  });

  it('Testa se executando a função fetchProducts passando o argumento computador se fetch foi chamada', () => {
    fetchProducts('computador');
    expect(fetch).toHaveBeenCalled();
  });

  it('Teste se, ao chamar a função fetchProducts com o argumento "computador", a função fetch utiliza o endpoint correto', async () => {
    expect.assertions(1);
    await fetchProducts('wolfi');
    const url = 'https://api.mercadolibre.com/sites/MLB/search?q=computador';
    expect(fetch).toHaveBeenCalledWith(url);
  });

  it('Teste se o retorno da função fetchProducts com o argumento "computador" é uma estrutura de dados igual ao objeto computadorSearch', async () => {
    const expected = computadorSearch;
    const result = await fetchProducts('computador');
    expect(expected).toEqual(result);
  });

  it('Teste se, ao chamar a função fetchProducts sem argumentos se ela retorna um erro', async () => {
    const expected = new Error('You must provide an url');
    const result = await fetchProducts();
    expect(expected).toEqual(result);
  });
});
