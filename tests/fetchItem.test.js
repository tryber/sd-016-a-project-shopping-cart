const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

window.fetch = jest.fn(fetchSimulator);

describe('2 - Teste a função fecthItem', () => {
  it('Teste se fetchItem é uma função', () => {
    expect(typeof fetchItem).toBe('function');
  });
  it('teste se fetch foi chamada ao executar fetchItem', async () => {
    await fetchItem('MLB1615760527')
    expect(fetch).toHaveBeenCalled();
  });
  it('Teste se, ao chamar fetchItem com o argumento "MLB1615760527", a função fetch utiliza o endpoint "https://api.mercadolibre.com/items/MLB1615760527"', async () => {
    await fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalledWith("https://api.mercadolibre.com/items/MLB1615760527")
  });
  it('Teste se o retorno da função fetchItem com o argumento "MLB1615760527" é uma estrutura de dados igual ao objeto item', async () => {
    const atual = await fetchItem('MLB1615760527');
    expect(atual).toEqual(item);
  });
  it('Teste se ao chamar a função fetchItem sem argumentos retorna uma mensagem de erro', async () => {
    fetchItem().catch((erro) => {
      expect(erro).toThrow('You must provide an url');
    });
  });
});
