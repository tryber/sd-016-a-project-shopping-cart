// requisito executado com o auxilio da mentoria de Humberto Castro
const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

window.fetch = jest.fn(fetchSimulator);

describe('2 - Teste a função fecthItem', () => {
  
  test('deve ser uma função', () => {
    expect(typeof fetchItem).toBe('function')
  });

  test('ao chamar o argumento MLB1615760527, fetch é chamada', () => {
    fetchItem('item');
    expect(fetch).toHaveBeenCalled();
  });

  test('ao chamar com o argumento MLB1615760527, verificar se fecht foi chamada com endpoint correto', () => {
    const endpoint = 'https://api.mercadolibre.com/items/MLB1615760527';
    fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalledWith(endpoint);
  });

  test('se o retorno é um objeto igual ao item', async () => {
    const results = await fetchItem('MLB1615760527');
    expect(results).toEqual(item);
  });

  test('ao chamar a função sem argumento deve retornar error', async () => {
    const expectError = new Error('You must provide an url');
    const result = await fetchItem();
    expect(result).toEqual(expectError);
  });

});
