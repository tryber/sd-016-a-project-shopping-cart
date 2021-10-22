/**
 * Consultei o vídeo gravada pelo Bernardo Salgueiro para resolver essa parte.
 * Link- https://app.slack.com/client/TMDDFEPFU/C02A8CKT31U/thread/C02A8CKT31U-1634781501.006900
* */

const fetchProducts = (product) => 
fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${product}`)
  .then((data) => data.json())
  .catch((error) => error);
if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
