const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

window.fetch = jest.fn(fetchSimulator);

describe('2 - Teste a função fecthItem', () => {
  // implemente seus testes aqui MLB1615760527
  it('testes se fecthProducts é uma função', () => {
    expect(typeof fetchItem).toBe('function');
  })
  
  it('Teste a função fecthItem com o argumento MLB1615760527 e teste se fetch foi chamado', async () => {    
    await fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalled();
  }  
  )
  it('Teste se ao chamar a função fecthItem com o argumento "MLB1615760527", a função fetch utiliza o endpoint "https://api.mercadolibre.com/sites/MLB/search?q=computador', async () => {    
    await fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalledWith('https://api.mercadolibre.com/items/MLB1615760527');
  }  
  )
  it('Teste se o retorno da função fecthItem com o argumento "MLB1615760527" é uma estrutura de dados igual ao objeto item, que já está importado no arquivo', async () => {    
    const retur = await fetchItem('MLB1615760527');
    //console.log(retur)
    expect(retur).toMatchObject(item);
  }
   )
   it('Teste se, ao chamar a função fecthItem sem argumento, retorna um erro com a mensagem: You must provide an url', async () => {    
    const err = new Error('You must provide an url');
    const dados = await fetchItem();
    expect(dados).toEqual(err);
  }
   ) 
  
});
