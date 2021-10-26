const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

window.fetch = jest.fn(fetchSimulator);

////referência matchers da documentação no README do projeto: https://jestjs.io/pt-BR/docs/expect#tohavebeencalled

describe('2 - Teste a função fecthItem', () => {
  it('Se é uma função', () => {
    expect(typeof fetchItem).toBe('function');
  });
  it('Se com o argumento "computador" fetch foi chamada', () => {
    fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalled();
  });
  it('Se com o argumento "MLB1615760527", a função fetch utiliza o endpoint correto', () => {
    const endpoint = 'https://api.mercadolibre.com/items/MLB1615760527';
    fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalledWith(endpoint);
  });
    it('testa se o retorno da função é um objeto igual a computadorSearch', async () => {
    const results = await fetchItem('MLB1615760527');
    expect(results).toEqual(item);
  });
  it('Se ao chamar a função sem argumento, retorna o erro esperado', async () => {
    const expectedError = new Error('You must provide an url');
    const result = await fetchItem();
    expect(result).toEqual(expectedError);
  });
});
