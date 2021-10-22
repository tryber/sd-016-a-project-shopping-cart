const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

window.fetch = jest.fn(fetchSimulator);

describe('2 - Teste a função fecthItem', () => {
  it('Testa se o tipo de fetchProducts é uma função', () => {
    const expected = 'function';
    const result = typeof fetchItem;

    expect(expected).toBe(result);
  });

  it('Testa se executando a função fetchItem passando o argumento MLB1615760527 se fetch foi chamada', () => {
    fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalled();
  });

  it('Teste se, ao chamar a função fetchItem com o argumento "MLB1615760527", a função fetch utiliza o endpoint correto', async () => {
    expect.assertions(1);
    await fetchItem('MLB1615760527');
    const url = 'https://api.mercadolibre.com/items/MLB1615760527';
    expect(fetch).toHaveBeenCalledWith(url);
  });

  it('Teste se o retorno da função fetchItem com o argumento "MLB1615760527" é uma estrutura de dados igual ao objeto item', async () => {
    const expected = item;
    const result = await fetchItem('MLB1615760527');
    expect(expected).toEqual(result);
  });

  it('Teste se, ao chamar a função fetchItem sem argumentos se ela retorna um erro', async () => {
    const expected = new Error('You must provide an url');
    const result = await fetchItem();
    expect(expected).toEqual(result);
  });
});
