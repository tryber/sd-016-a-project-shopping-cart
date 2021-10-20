const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

window.fetch = jest.fn(fetchSimulator);

describe('2 - Teste a função fecthItem', () => {
  it('Verifica se fetchItem é uma função', () => {
    const expectedResult = 'function';
    expect(typeof fetchItem).toBe(expectedResult);
  })

  it('Verifica se, ao executar a função fetchItem com o argumento "MLB1615760527", a função "fetch" será chamada', () => {
    fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalled();
  })

  it('Verifica se, ao chamar a função fetchItem com o argumento "MLB1615760527", a função fetch utiliza o endpoint "https://api.mercadolibre.com/items/MLB1615760527"', () => {
    const expectedArgument = 'https://api.mercadolibre.com/items/MLB1615760527';
    fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalledWith(expectedArgument);
  })

  it('Verifica se o retorno da função fetchItem com o argumento "MLB1615760527" é uma estrutura de dados igual ao objeto item, que já está importado no arquivo', async () => {
    const expectedResult = item;
    const result = await fetchItem('MLB1615760527');
    expect(result).toEqual(expectedResult);
  })

  it('Verifica se, ao chamar a função fetchItem sem argumento, retorna um erro com a mensagem: You must provide an url', async () => {
    try {
      await fetchItem();
    } catch(error) {
      expect(error).toEqual(new Error('You must provide an url'));
    }
  })
});
