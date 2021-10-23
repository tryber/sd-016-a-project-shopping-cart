const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

window.fetch = jest.fn(fetchSimulator);

describe('2 - Teste a função fecthItem', () => {
  it('Deve ser uma função', () => {
    expect(typeof fetchItem).toBe('function');
  });
  it('Ao ser chamada com o argumento "MLB1615760527", fetch deve ser chamada', () => {
    fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalled();
  });
  it('Ao ser chamada com o argumento "MLB1615760527", fetch deve utilizar o endpoint correto', () => {
    const expectedEndpoint = 'https://api.mercadolibre.com/items/MLB1615760527';
    fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalledWith(expectedEndpoint);
  });
  it('Ao ser chamada com o argumento "MLB1615760527", fetch deve retornar uma estrutura de dados igual à esperada', async () => {
    const result = await fetchItem('MLB1615760527');
    expect(result).toEqual(item);
  });
  it('Ao ser chamada com o argumento "MLB1615760527", fetch deve retornar uma estrutura de dados igual à esperada', async () => {
    const expectedError = new Error('You must provide an url');
    const result = await fetchItem();
    expect(result).toEqual(expectedError);
  });
});
