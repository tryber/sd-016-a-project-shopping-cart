const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

window.fetch = jest.fn(fetchSimulator);

describe('2 - Teste a função fecthItem', () => {
  // implemente seus testes aqui
  it('Verifiaca se fetchItem é uma função', () => {
    expect(typeof fetchItem).toBe('function')
  })

  it('Verifica se fetchItem com o argumento "MLB1615760527" a função fecth é chamada', () => {
    fetchItem("MLB1615760527");
    expect(fetch).toHaveBeenCalled();
  })

  it('Verifica se o retorno da função com o argumento "MLB1615760527", a função fetch utiliza o endpoint', async () => {
    await fetchItem("MLB1615760527");
    expect(fetch).toHaveBeenLastCalledWith('https://api.mercadolibre.com/items/MLB1615760527');
  })
  it('Verifica se ao chemar a função fetchItem sem argumento retorna um erro', async () => {
    const error = new Error ('You must provide an url')
    const result = await fetchItem();
    expect(result).toEqual(error);
  })
});
