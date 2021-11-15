const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

window.fetch = jest.fn(fetchSimulator);

describe('2 - Teste a função fecthItem', () => {
  // implemente seus testes aqui
  it('fetchItem() deve ser uma função', () => {
    expect(typeof fetchItem).toBe('function');
  });

  it('passando o argumento MLB1615760527 a função funciona', async () => { 
    await fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalled();
  });

  it('passando o argumento MLB1615760527 a função traz o endpoint correto', async () => {
    await fetchItem('MLB1615760527'); 
    expect(fetch).toHaveBeenCalledWith("https://api.mercadolibre.com/items/MLB1615760527");
  });

  it('testa se o retorno de fetchItem é igual ao objeto item', async () => { 
    const test = await fetchItem("MLB1615760527")
    return expect(test).toEqual(item);
  });

  it('Deve retornar o erro "You must provide an url"', async () => {
    const error = new Error('You must provide an url');
    const results = await fetchItem();
    expect(results).toEqual(error)

  });
});
