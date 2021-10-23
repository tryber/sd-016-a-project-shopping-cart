const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

window.fetch = jest.fn(fetchSimulator);

describe('2 - Teste a função fecthItem', () => {
  it('Teste se fetchItem é uma função', () => {
    expect(typeof fetchItem).toBe('function');
  });
  it('Testa se fetch foi chamada utilizando argumento "MLB1615760527"', () => {
    fetchItem('MLB1615760527')
    expect(fetch).toHaveBeenCalled();
  });
  it('Teste se fetch utiliza o endpoint correto', () => {
    fetchItem('MLB1615760527')
    expect(fetch).toHaveBeenCalledWith('https://api.mercadolibre.com/items/MLB1615760527');
  });
  it('Testa se o retorno da função é uma estrutura de dados igual ao objeto item', async () => {
    await fetchItem('MLB1615760527')
    expect(fetch === item).toBeTrue;
  });
  it('Testa se, ao chamar a função sem argumento, retorna um erro', async () => {
    try {
      await fetchItem();
    } catch (error) {
      expect(error).toEqual(new Error('You must provide an url'));
    }
  });
});
