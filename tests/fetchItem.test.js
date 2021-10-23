const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

window.fetch = jest.fn(fetchSimulator);

describe('2 - Teste a função fecthItem', () => {
  test ('Se fetchItem é uma função', () => {
    expect(typeof fetchItem).toEqual('function')
  });

  test ('Se fetch é chamada caso chamado a função fetchItem(MLB1615760527)', () => {
    fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalled();
  });

  test ('Se ao chamar fetchItem(MLB1615760527) a função usa o endpoint especificado', () => {
    const endpoint =  "https://api.mercadolibre.com/items/MLB1615760527";
    expect(fetch).toHaveBeenCalledWith(endpoint)
  })

  test('Se ao chamar fetchItem(MLB1615760527) retorna um objeto igual ao computadorSearch', async () => {
    const functionFetch = await fetchItem('MLB1615760527');
    expect(functionFetch).toEqual(item);
  })

  test('Se ao chamar a função sem parametro retorna um erro', async () => {
    const functionFetch =  await fetchItem();
    expect(functionFetch).toEqual(new Error('You must provide an url'));
  })



});
