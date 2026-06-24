import axios from "axios";

const API_URL_MASSIVE = 'http://localhost:8080/bars';

export async function getPrices(symbol: string) {
    return await axios.get(`${API_URL_MASSIVE}/custom/${symbol}`); 
}