const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

window.fetch = jest.fn(fetchSimulator);

describe('2 - Teste a função fecthItem', () => {
  it('Testa se é uma função', () => {
    expect(typeof fetchItem).toBe('function');
  })

  it('Testa se, ao passar o id, fetch é chamado', () => {
    fetchItem('MLB1341706310');
    expect(fetch).toHaveBeenCalled();
  })

  it('Testa se ao passar o id, a devida url é usada como endpoint', () => {
    fetchItem('MLB1615760527');
    const url = 'https://api.mercadolibre.com/items/MLB1615760527';

    expect(fetch).toHaveBeenCalledWith(url);
  })

  it('Testa se o retorno de fetch possui mesma estrutura do objeto item', async () => {
    fetchItem('MLB1615760527');
    const expectedObject = await fetchItem('MLB1615760527');
    expect(expectedObject).toEqual(item);
  })

  it('Testa se a função retorna o devido erro ao não receber parâmetros', async () => {
    const errorMessage = new Error('You must provide an url');
    const executeFetchItem = await fetchItem();
  
    expect(executeFetchItem).toEqual(errorMessage);
  } )
});
