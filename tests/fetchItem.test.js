const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

window.fetch = jest.fn(fetchSimulator);

describe('2 - Teste a função fecthItem', () => {
  it('Testa se fetchItem é uma função', () => {
    expect.assertions(1);
    expect(typeof fetchItem).toEqual('function');
  });
  it('Testa se fetchItem é chamada com o argumento `MLB1615760527`', async () => {
    expect.assertions(1);
    await fetchItem('MLB1615760527');

    expect(window.fetch).toHaveBeenCalled();
  });
  it('Testa se fetchItem, quando chamada com o argumento `MLB1615760527`, utiliza o endpoint esperado', async () => {
    expect.assertions(1);
    await fetchItem('MLB1615760527');
    const endpoint = 'https://api.mercadolibre.com/items/MLB1615760527';

    expect(window.fetch).toHaveBeenCalledWith(endpoint);
  });
  it('Testa se fetchItem retorna a estrutura de dados esperada quando chamada com o argumento `MLB1615760527`', async () => {
    expect.assertions(1);
    const response = await window.fetch('https://api.mercadolibre.com/items/MLB1615760527');
    const data = await response.json();

    expect(data).toEqual(item);
  });
  it('Testa se fetchItem sem argumentos, retorna um erro', async () => {
    expect.assertions(1);
    const thrownError = new Error('You must provide an url');
    try {
      await fetchItem();
    } catch (error) {
      expect(error).toEqual(thrownError)
    }
  });
});
