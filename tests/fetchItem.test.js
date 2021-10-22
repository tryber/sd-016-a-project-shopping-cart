const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

window.fetch = jest.fn(fetchSimulator);

describe('2 - Teste a função fecthItem', () => {
  it('testa se é função', () => {
    expect(typeof fetchItem).toBe('function');
  });
  it('testa se fetch é chamada', () => {
    fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalled();
  });
  it('passando o argumento MLB1615760527, a função fetch utiliza o endpoint correto', () => {
    fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalledWith('https://api.mercadolibre.com/items/MLB1615760527');
  });
  it('passando o argumento MLB1615760527, verifica se o retorno é um objeto igual a item', async () => {
    const result = await fetchItem('MLB1615760527');
    expect(result).toEqual(item)
  });
  it('passando a função sem argumento retorna um erro', async () => {
    const expectedResult = new Error('You must provide an url');
    const functionCall = await fetchItem();
    expect(functionCall).toEqual(expectedResult);
  });
});
