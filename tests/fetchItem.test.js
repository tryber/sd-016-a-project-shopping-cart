const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

window.fetch = jest.fn(fetchSimulator);

describe('2 - Teste a função fecthItem', () => {
  it('1 - Teste se fetchItem é uma função.', (done) => {
    try {
      expect(typeof fetchItem).toBe('function');
      done();
    } catch (error) {
      done(error);
    }
  });

  it('2 - Execute a função fetchItem com o argumento do item "MLB1615760527" e teste se fetch foi chamada.', async () => {
    await fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalled();
  });

  it('3 - Teste se, ao chamar a função fetchItem com o argumento do item "MLB1615760527".', async () => {
    const url = 'https://api.mercadolibre.com/items/MLB1615760527';
    await fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalledWith(url);
  })

  it('4 - Teste se o retorno da função fetchItem com o argumento do item "MLB1615760527" é uma estrutura de dados igual ao objeto item que já está importado no arquivo.', async () => {
    const result = await fetchItem('MLB1615760527');
    expect(result).toEqual(item);
  });

  it('5 - Teste se, ao chamar a função fetchItem sem argumento, retorna um erro com a mensagem: You must provide an url.', async (done) => {
    try {
      const expectedError = 'You must provide an url';
      const result = await fetchItem();
      expect(result).toEqual(expectedError);
      done();
    } catch (error) {
      done(error);
    }
  });
});
