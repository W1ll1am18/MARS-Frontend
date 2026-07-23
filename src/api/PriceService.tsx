import axios from "axios";

const API_URL_MASSIVE_BARS = import.meta.env.VITE_API_URL_MASSIVE_BARS || 'http://localhost:8080/bars';

export async function getPrices(symbol: string) {
    return await axios.get(`${API_URL_MASSIVE_BARS}/custom/${symbol}`); 
}