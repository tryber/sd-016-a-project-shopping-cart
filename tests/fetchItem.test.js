const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

window.fetch = jest.fn(fetchSimulator);

describe('2 - Teste a função fecthItem', () => {
  it('testa se é uma funçao', () => {
    expect(typeof fetchItem).toBe('function');
  });
  it('testa se estiver vazio retorna error', async () => {
    const message = await fetchItem();
    expect(message).toBe('error');
  });
  it('3 - Teste se, ao chamar a função fetchItem com o argumento do item "MLB1615760527", a função fetch utiliza o endpoint "https://api.mercadolibre.com/items/MLB1615760527"', () => {
    fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalledWith("https://api.mercadolibre.com/items/MLB1615760527");
  })
  it('4 - Teste se o retorno da função fetchItem com o argumento do item "MLB1615760527" é correto ', async () => {
    const retorno = await fetchItem('MLB1615760527');
    expect(retorno).toBe(item);
  });
});
