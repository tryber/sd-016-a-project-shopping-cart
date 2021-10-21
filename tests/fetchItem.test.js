const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

window.fetch = jest.fn(fetchSimulator);

describe('2 - Teste a função fecthItem', () => {
  // implemente seus testes aqui
  test('Verifica se `fetchItem()` é uma função', () => {
    expect(typeof(fetchItem)).toBe('function');
  });
  test('Verifica se a função `fetch` é chamada ao executar `fetchItem("MLB1615760527")`', () => {
    fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalled();
  });
  test('Verifica se ao chamar a função `fetchItem("MLB1615760527")`, a função `fetch` usa o argumento correto', () => {
    const endpoint = 'https://api.mercadolibre.com/items/MLB1615760527';
    fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalledWith(endpoint);
  });
  test('Testa se ao chamar a função `fetchItem("MLB1615760527")`, retorna um objeto igual `item`', async () => {
    const funcObject = await fetchItem("MLB1615760527");
    expect(funcObject).toEqual(item);
  });
  test('verifica se ao chamar a função `fetchItem()` sem parâmetros, retorna um erro', async () => {
    const funct = await fetchItem();
    const error = new Error('You must provide an url');
    expect(funct).toEqual(error);
  });
});
