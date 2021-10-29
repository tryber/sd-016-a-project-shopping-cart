const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

window.fetch = jest.fn(fetchSimulator);

describe('2 - Teste a função fecthItem', () => {
  // implemente seus testes aqui
  it('testa se fecthItem é uma função', () => {
    expect(typeof fetchItem).toBe('function');
  });
  it('testa se fecth é chamada na função fetchItem com o argumento "MLB1615760527"', async () => {
    await fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalled();
  });
  it('Teste se, ao chamar a função fetchItem com o argumento "MLB1615760527", a função fetch utiliza o endpoint "https://api.mercadolibre.com/items/MLB1615760527"', () => {
    fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalledWith('https://api.mercadolibre.com/items/MLB1615760527')
  });
  it('ao passar "MLB1615760527" como parâmetro retorna o esperado', async () => {
    const call = await fetchItem('MLB1615760527')
    expect(call).toEqual(item);
  });
  it('Teste se, ao chamar a função fetchItem sem argumento, retorna um erro com a mensagem: "You must provide an url"', async () => {
    const call = await fetchItem();
    expect(call).toEqual(new Error("You must provide an url"));
  });
});
