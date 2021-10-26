const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

window.fetch = jest.fn(fetchSimulator);

describe('2 - Teste a função fecthItem', () => {
  it('Testa se é uma funcão', () => {
    expect(typeof fetchItem).toBe('function');
  });
  it('Testa se foi chamada', () => {
    fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalled();
  });
  it('Testa se foi chamada com o endpoint correto', () => {
    const endpoint = "https://api.mercadolibre.com/items/MLB1615760527"
    fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalledWith(endpoint); // falso positivo por causa do mock
  });
  it('testa se reporto é igual a MLB1615760527', async () => {
    const resultado = await fetchItem('MLB1615760527');
    return expect(resultado).toEqual(item);
  });
  it('verificar se retorna erro', async () => {
    const resultado = await fetchItem();
    const err = new Error('You must provide an url');
    expect(resultado).toEqual(err);
  });
});
