const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

window.fetch = jest.fn(fetchSimulator);

describe('2 - Teste a função fecthItem', () => {
  // implemente seus testes aqui
  fetchItem("MLB1615760527");
  it('1 - Teste se fetchItem é uma função', () => {
    expect(typeof fetchItem).toBe('function');
  })
  it('2 - Execute a função fetchItem com o argumento do item "MLB1615760527" e teste se fetch foi chamada', () => {
    expect(fetch).toHaveBeenCalled();
  });
  it('3 - Teste se, ao chamar a função fetchItem com o argumento do item "MLB1615760527", a função fetch utiliza o endpoint "https://api.mercadolibre.com/items/MLB1615760527";', () => {
    expect(fetch).toHaveBeenLastCalledWith('https://api.mercadolibre.com/items/MLB1615760527')
  })
});
