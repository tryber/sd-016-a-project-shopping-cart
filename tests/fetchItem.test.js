const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

window.fetch = jest.fn(fetchSimulator);

describe('2 - Teste a função fecthItem', () => {
  // implemente seus testes aqui
  it('2 - Verifica se fetchItem é uma função', () => {
    expect(typeof fetchItem).toBe("function");
  });
  it('2 - Verifica se a função é chamda com o argumento "MLB1615760527"', () => {
    fetchItem("MLB1615760527");
    expect(fetch).toHaveBeenCalled();
  });
  it('2 - Verifica se ao chamar a função fetchItem com o argumento "MLB1615760527" a função utiliza o endpoint "https://api.mercadolibre.com/items/MLB1615760527"', () => {
    fetchItem("MLB1615760527");
    expect(fetch).toHaveBeenCalledWith("https://api.mercadolibre.com/items/MLB1615760527");
  });
  it('2 - Verifica se o retorno da função fetchItem com o argumento "MLB1615760527" retorna uma estrutura de dados semelhante ao objeto item', async () => {
    const result = await fetchItem("MLB1615760527");
    expect(result).toEqual(item);
  });
  it('2 - Verifica se ao chamar a função fetchItem sem argumentos, retorna o erro "new Error("mensagem esperada aqui")"', async () => {
    try {
      await fetchItem();
    } catch(error) {
      expect(error).toEqual(new Error('You must provide an url'));
    }
  });
});
