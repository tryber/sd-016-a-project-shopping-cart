const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

window.fetch = jest.fn(fetchSimulator);

describe('1 - Teste a função fecthProducts', () => {
  it('Verifica se fetchProducts é uma função', () => {
    expect(fetchProducts).toBeInstanceOf(Function);
  })

  it('Verifica se ao chamar a função fetchProducts com argumento "computador", fetch foi chamada', () => {
    expect.assertions(1);
    fetchProducts('computador');
    expect(fetch).toHaveBeenCalled();
  })

  it('Ao chamar fetchProducts com o argumento "computador", verifica se fetch utiliza o endpoint "https://api.mercadolibre.com/sites/MLB/search?q=computador"', async () => {
    expect.assertions(1);
    const expectResult = 'https://api.mercadolibre.com/sites/MLB/search?q=computador'
    await fetchProducts('computador');
    expect(fetch).toHaveBeenCalledWith(expectResult);
  })

  it('Verifica se ao retornar fetchProducts com o argumento "computador" é uma estrutura de dados igual ao objeto computadorSearch', async () => {
    expect.assertions(1);
    const result = await fetchProducts('computador');
    expect(result).toEqual(computadorSearch);
  })

  it('Verifica se ao retornar fetchProducts sem argumento, retorna um erro com a mensagem: You must provide an url', async () => {
    expect.assertions(1);
    const expectedError = new Error('You must provide an url');
    const result = await fetchProducts();
    expect(result).toEqual(expectedError);
  })
});
