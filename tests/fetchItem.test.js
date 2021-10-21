const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

window.fetch = jest.fn(fetchSimulator);

describe('2 - Teste a função fecthItem', () => {
  it('Teste se é uma função', () => {
    expect(typeof fetchItem).toBe('function')
  })

  it('Execute a função com o argumento "MLB1615760527" e teste se fetch foi chamada', async () => {
    await fetchItem("MLB1615760527");
    expect(fetch).toHaveBeenCalled();
  })

  it('Teste se a função utiliza o endpoint correto', async () => {
    await fetchItem("MLB1615760527");
    const url = "https://api.mercadolibre.com/items/MLB1615760527";
    expect(fetch).toHaveBeenCalledWith(url)
  })

  it('Teste se o retorno de fetchItem("MLB1615760527") é igual ao objeto importado', () => {
    const result = jest.fn((fetchSimulator) => item);
    result();
    expect(result).toHaveReturned()
  })

  it('Testa se ao chamar a função sem argumento, retorna um erro com a mensagem: You must provide an url', async () => {
    try {
      await fetchItem();
    } catch (error) {
      expect(error).toEqual(new Error('You must provide an url'));
    };
  })
});
