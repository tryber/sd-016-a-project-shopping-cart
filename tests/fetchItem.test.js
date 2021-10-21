const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

window.fetch = jest.fn(fetchSimulator);

describe('2 - Teste a função fetchItem', () => {
  // implemente seus testes aqui
  it('Testa se fetchItem é uma função', () => {
    expect.assertions(1);
    expect(fetchItem).toBeInstanceOf(Function);
  });

  it('Executa a função fetchItem com o argumento "MLB1615760527" e testa se "fetch" foi chamada', async () => {
    expect.assertions(1);
    await fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalled();
  });
});
