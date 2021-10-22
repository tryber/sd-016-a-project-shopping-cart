const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

window.fetch = jest.fn(fetchSimulator);

describe('2 - Teste a função fecthItem', () => {
  it('Testando se fetchItem é uma funcao', () => {
    expect(typeof fetchItem).toBe('function');
  })

  it('Executando a função fetchItem com o argumento "MLB1615760527" e testando se fetch foi chamada', () => {
    fetchItem(fetch, 'MLB1615760527');
    expect(fetch).toHaveBeenCalled();
  })

  it('Testando se, ao chamar a função fetchItem com o argumento "MLB1615760527", a função fetch utiliza o endpoint "https://api.mercadolibre.com/items/MLB1615760527"', () => {
    const expectResult = 'https://api.mercadolibre.com/items/MLB1615760527';
    fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalledWith(expectResult);
  })

  it('Testando se o retorno da função fetchItem com o argumento "MLB1615760527" é uma estrutura de dados igual ao objeto item, que já está importado no arquivo' , async () => {
    const expectedResult = item;
    const result = await fetchItem('MLB1615760527');
    expect(result).toEqual(expectedResult);
  })

  it('Testando se, ao chamar a função fetchItem sem argumento, retorna um erro com a mensagem: You must provide an url', async () => {
    try {
      await fetchItem();
    } catch(error) {
      expect(error).toEqual(new Error ('You must provide an url'));
    }
  })
});
