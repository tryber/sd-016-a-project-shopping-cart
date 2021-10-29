const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

window.fetch = jest.fn(fetchSimulator);

describe('2 - Teste a função fecthItem', () => {
  test('Testa se fetchItem é um função', () => {
    expect(typeof fetchItem).toEqual('function');
  })

  test('Testa se fetch é chamada quando fetchItem("MLB1615760527") é chamada', async() => {
    await fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalled();
  })

  test('Testa se, ao chamar a função fetchItem com o argumento "MLB1615760527", a função fetch utiliza o endpoint: "https://api.mercadolibre.com/items/MLB1615760527"', async () => {
    await fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalledWith('https://api.mercadolibre.com/items/MLB1615760527');
  })

  test('Testa se o retorno da função é o esperado', async () => {
    const value = await fetchItem('MLB1615760527');
    expect(value).toEqual(item);
  })

  // test('Teste se, ao chamar a função fetchProducts sem argumento, retorna um erro com a mensagem: You must provide an url', async () => {
  //   const value = async () => fetchProducts();
  //   expect(value).toThrowError(new Error('You must provide an url')); // não consigo fazer da throw...
  // })
});
