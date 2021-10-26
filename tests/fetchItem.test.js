const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

window.fetch = jest.fn(fetchSimulator);

describe('2 - Teste a função fecthItem', () => {

  it('fetchItem deve ser uma função!', () => {
    fetchItem();
    expect(typeof fetchItem).toBe('function');
  });

  it('fetch deve ser chamada em fetchItem!', () => {
    fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalled();
  });

  it('Ao Chamar fetch, Deve ser Buscado o endpoint correto!', () => {
    fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalledWith('https://api.mercadolibre.com/items/MLB1615760527');
  });

  it('O retorno deve ser igual ao objeto criado em ./mocks/item.js', async () => {
    const functionReturnTest = await fetchItem('MLB1615760527');
    expect(functionReturnTest).toEqual(item);
  });

  it('Caso fetchItem não receba parâmetro, o erro correto deverá ser retornado', async () => {
    const errorHandlingTest = await fetchItem();
    const errorExpected = new Error('You must provide an url');
    expect(errorHandlingTest).toEqual(errorExpected);
  });

});
