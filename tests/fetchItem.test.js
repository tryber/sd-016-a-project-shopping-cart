const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

window.fetch = jest.fn(fetchSimulator);

describe('2 - Teste a função fecthItem', () => {
  // implemente seus testes aqui
  test('Verifica se fetchItem é uma função ', () => {
    expect(typeof fetchItem).toBe('function');
  });
  test('Se fetch foi chamado ', () => {
    fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalled();
  });
  test('Se foi chamado com endpoint ', () => {
    const endpoint = 'https://api.mercadolibre.com/items/MLB1615760527';
    fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalledWith(endpoint);
  });
  test('Se o retorno do objeto é igual a Item', async () => {
    const results = await fetchItem('MLB1615760527');
    expect(results).toEqual(item);
  });
  test('Se retorna erro', async () => {
    const expectError = new Error('You must provide an url');
    const result = await fetchItem();
    expect(result).toEqual(expectError);
  });
});
