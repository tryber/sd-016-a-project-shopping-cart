const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

window.fetch = jest.fn(fetchSimulator);

const expectedResult = {
  "site_id": "MLB",
  "query": "computador",
  "paging": {
    "total": 406861,
    "offset": 0,
    "limit": 50,
    "primary_results": 1001
  },
  "results": [
    {
      "id": "MLB1341925291",
      "site_id": "MLB",
      "title": "Processador Intel Core I5-9400f 6 Núcleos 128 Gb",
      "seller": {
        "id": 385471334,
        "permalink": null,
        "power_seller_status": null,
        "car_dealer": false,
        "real_estate_agency": false,
        "tags": []
      },
      "price": 899,
      "currency_id": "BRL",
      "available_quantity": 1,
      "sold_quantity": 0,
      "buying_mode": "buy_it_now",
      "listing_type_id": "gold_pro",
      "stop_time": "2039-10-10T04:00:00.000Z",
      "condition": "new",
      "permalink": "https://www.mercadolivre.com.br/processador-intel-core-i5-9400f-6-nucleos-128-gb/p/MLB13953199",
      "thumbnail": "http://mlb-s2-p.mlstatic.com/813265-MLA32241773956_092019-I.jpg",
      "accepts_mercadopago": true,
      "installments": {
        "quantity": 12,
        "amount": 74.92,
        "rate": 0,
        "currency_id": "BRL"
      },
      "address": {
        "state_id": "BR-SP",
        "state_name": "São Paulo",
        "city_id": "BR-SP-27",
        "city_name": "São José dos Campos"
      },
      "shipping": {
        "free_shipping": true,
        "mode": "me2",
        "tags": [
          "fulfillment",
          "mandatory_free_shipping"
        ],
        "logistic_type": "fulfillment",
        "store_pick_up": false
      },
      "seller_address": {
        "id": "",
        "comment": "",
        "address_line": "",
        "zip_code": "",
        "country": {
          "id": "BR",
          "name": "Brasil"
        },
        "state": {
          "id": "BR-SP",
          "name": "São Paulo"
        },
        "city": {
          "id": "BR-SP-27",
          "name": "São José dos Campos"
        },
        "latitude": "",
        "longitude": ""
      },
      "attributes": [
        {
          "source": 1,
          "id": "ALPHANUMERIC_MODEL",
          "value_id": "6382478",
          "value_struct": null,
          "values": [
            {
              "name": "BX80684I59400F",
              "struct": null,
              "source": 1,
              "id": "6382478"
            }
          ],
          "attribute_group_id": "OTHERS",
          "name": "Modelo alfanumérico",
          "value_name": "BX80684I59400F",
          "attribute_group_name": "Outros"
        },
        {
          "id": "BRAND",
          "value_struct": null,
          "attribute_group_name": "Outros",
          "attribute_group_id": "OTHERS",
          "source": 1,
          "name": "Marca",
          "value_id": "15617",
          "value_name": "Intel",
          "values": [
            {
              "id": "15617",
              "name": "Intel",
              "struct": null,
              "source": 1
            }
          ]
        },
        {
          "name": "Condição do item",
          "value_id": "2230284",
          "attribute_group_id": "OTHERS",
          "attribute_group_name": "Outros",
          "source": 1,
          "id": "ITEM_CONDITION",
          "value_name": "Novo",
          "value_struct": null,
          "values": [
            {
              "id": "2230284",
              "name": "Novo",
              "struct": null,
              "source": 1
            }
          ]
        },
        {
          "id": "LINE",
          "value_name": "Core i5",
          "attribute_group_id": "OTHERS",
          "attribute_group_name": "Outros",
          "name": "Linha",
          "value_id": "7769178",
          "value_struct": null,
          "values": [
            {
              "id": "7769178",
              "name": "Core i5",
              "struct": null,
              "source": 1
            }
          ],
          "source": 1
        },
        {
          "id": "MODEL",
          "value_struct": null,
          "values": [
            {
              "id": "6637008",
              "name": "i5-9400F",
              "struct": null,
              "source": 1
            }
          ],
          "attribute_group_id": "OTHERS",
          "name": "Modelo",
          "value_id": "6637008",
          "value_name": "i5-9400F",
          "attribute_group_name": "Outros",
          "source": 1
        }
      ],
      "differential_pricing": {
        "id": 33580182
      },
      "original_price": null,
      "category_id": "MLB1693",
      "official_store_id": null,
      "catalog_product_id": "MLB13953199",
      "tags": [
        "brand_verified",
        "good_quality_picture",
        "good_quality_thumbnail",
        "immediate_payment",
        "cart_eligible"
      ],
      "catalog_listing": true
    },
  ]
};

describe('1 - Teste a função fecthProducts', () => {
  it("fetchProducts retorna o resultado esperado quando pesquisa por \"computador\"", () => {
    fetchProducts("computador")
      .then((res) =>
        expect(res).toEqual(expectedResult)
      );
  });
});
