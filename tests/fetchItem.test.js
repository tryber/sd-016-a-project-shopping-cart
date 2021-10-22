const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

window.fetch = jest.fn(fetchSimulator);

describe('1 - Teste se a fecthItem é uma função', () => {
  it('deve ser uma função', () => {
    expect(typeof fetchItem).toBe('function');
  });
  it('testa se ao chamar a função com argumento "MLB1615760527", fetch é chamada', () => {
    fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalled();
  });
  it('testa se a função ao ser chamada c o argumento "MLB1615760527" ,testa se foi chamada com o endpoint' , () => {
    const endpoint = `https://api.mercadolibre.com/items/MLB1615760527`;
    fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalledWith(endpoint);
  });
  it ('testa se o retorno da função é um objeto igual a item', async () => {
    const results = await fetchItem('MLB1615760527');
    expect(results).toEqual(item);
  });
  it ('se ao chamar a função sem argumentos ela retorna um erro', async () => {
    const expectedError = new Error('You must provide an url');
    const result = await fetchItem();
    expect(result).toEqual(expectedError);
  });
});
