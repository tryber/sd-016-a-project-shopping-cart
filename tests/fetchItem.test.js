const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

window.fetch = jest.fn(fetchSimulator);

describe('2 - Teste a função fecthItem', () => {
  it ('Testa se fetchItem é uma função', () => {
    expect(typeof fetchItem).toBe('function')
  });

  it ('Testa se fetch foi chamada, ao passar "MLB1615760527" como argumento para fetchItem', async () => {
    await fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalled();
  });

  it ('Testa se fetch recebe a url correta', async () => {
    await fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalledWith('https://api.mercadolibre.com/items/MLB1615760527');
  });

  it ('Testa se o retorno de fetchItem("MLB1615760527") é igual ao objeto item', async () => {
    const id = await fetchItem('MLB1615760527');
    expect(id).toMatchObject(item);
  });

  it ('Testa se ao chamar fetchItem sem argumentos, retorna um erro', async () => {
    const expectedError = new Error('You must provide an url');
    const id = await fetchItem();
    expect(id).toEqual(expectedError);
  });
});
