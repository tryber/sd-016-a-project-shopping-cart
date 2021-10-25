const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

window.fetch = jest.fn(fetchSimulator);

describe('2 - Teste a função fecthItem', () => {
  // implemente seus testes aqui
  it('Verifica se a função fetchItem retorna o objeto JSON listado abaixo', () => {
    expect(typeof fetchItem).toBe('function');
  });
  it('Verifica se a função "fetch" foi chamada', async () => {
    expect.assertions(1);
    await fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalled();
  });
  it('Verifica se a função "fetch" foi chamada com o endpoint corretamente', async () => {
    expect.assertions(1);
    await fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalledWith(`https://api.mercadolibre.com/items/MLB1615760527`);
  });
  it('Verifica o resultado da função "fetchItem"', async () => {
    expect.assertions(1);
    expect(await fetchItem('MLB1615760527')).toEqual(item);
  })
  it('Verifica se função "fetchItem", quando chamada sem argumentos, retorna o erro "You must provide an url"', async () => {
    const expectedError = new Error('You must provide an url');
    const result = await fetchItem();
    expect(result).toEqual(expectedError);
  })
});
