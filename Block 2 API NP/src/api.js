import axios from 'axios';

const DEFAULT = 'https://api.novaposhta.ua/v2.0/json/';
const API = 'da920aa782da9ec9692a26cc3e0ce3a1';

export function getCities(city) {
    return axios.post(DEFAULT, {
        'apiKey': API,
        'modelName': 'Address',
        'calledMethod': 'getCities',
        'methodProperties': {
            'FindByString': city,
            'Limit': '20',
        },
    }).then((res) => res.data.data);
}


export function getAddresses(warehouseNumber, cityName) {
    return axios.post(DEFAULT, {
        'apiKey': API,
        'modelName': 'Address',
        'calledMethod': 'getWarehouses',
        'methodProperties': {
            'CityName': cityName,
            'WarehouseId': warehouseNumber,
            'Limit': '20',
        },
    }).then((res) => res.data.data);
}