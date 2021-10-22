const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

window.fetch = jest.fn(fetchSimulator);

describe('2 - Teste a função fecthItem', () => {
  // implemente seus testes aqui
  it('Verificar se deve ser uma função', () => {
    expect(typeof fetchItem).toBe('function');
  });
  it('Verifica se passar o parametro MLB1341706310 , fetchItem é chamada', () => {
    fetchItem('MLB1341706310');
    expect(fetch).toHaveBeenCalled();
  });
  it('Verifica se passar o parametro MLB1341706310 , fetchItem é chamada com endpoint npm ', () => {
    const endpoint = ('https://api.mercadolibre.com/items/MLB1341706310')
    fetchItem('MLB1341706310');
    expect(fetch).toHaveBeenCalledWith(endpoint);
  });
  it('Verifica se o retorno da função é um objeto igual a MLB1615760527', async () => {
    const results = await fetchItem('MLB1615760527');
    expect(results).toEqual(item);
  });
  it('Verifica o retorno de um erro', async () => {
    const expectedError = new Error('You must provide an url');
    const results2 = await fetchItem();
    expect(results2).toEqual(expectedError);
  });
});
