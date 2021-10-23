const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

window.fetch = jest.fn(fetchSimulator);

describe('2 - Teste a função fecthItem', () => {
    test('Se fetchItem é uma função', () => {
      expect(typeof  fetchItem).toBe('function');
    });
    test('Se fetch foi chamada', () => {
      fetchItem('MLB1615760527');
      expect(fetch).toHaveBeenCalled();
    })
    test('Executa a função com parametro "MLB1615760527"', () => {
      fetchItem('MLB1615760527');
      expect(fetch).toHaveBeenCalledWith('https://api.mercadolibre.com/items/MLB1615760527');
    })
    test('Se o retorno é um objeto', async () => {
      const getObjItem = await fetchItem('MLB1615760527');
      expect(getObjItem).toEqual(item);
    })
    test('A mensagem de erro retornada', async () => {
      const paramVazio = await fetchItem();
      const erroTest = new Error('You must provide an url');
      expect(paramVazio).toEqual(erroTest);
    })
  });
