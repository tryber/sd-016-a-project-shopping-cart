const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

window.fetch = jest.fn(fetchSimulator);

describe('2 - Teste a função fecthItem', () => {
  it('testa se é uma função', () => {
    expect(typeof fetchItem).toBe('function');
  });
  it('Execute a função fetchItem com o argumento do item "MLB1615760527" e teste se fetch foi chamada;', () => {
    fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalled();
  });
  it('ao chamá-la com argumento MLB1615760527, testa se fetch foi chamada com endpoint desejado', () => {
    const endPoint = 'https://api.mercadolibre.com/items/MLB1615760527';
    fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalledWith(endPoint);
  });
  it('testa se o retorno da função é um objeto igual ao objeto item já importado', async () => {
    const results = await fetchItem('MLB1615760527');
    expect(results).toEqual(item);
  });
  it('ao chamar a função fetchItem sem argumento, retorna um erro', async () => {
    const results = await fetchItem();
    const expectedError = new Error('You must provide an url')
    expect(results).toEqual(expectedError);
  })
});
