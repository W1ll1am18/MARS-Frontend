import axios from "axios";
import type { TickerFilters } from "../pages/Tickers";

const API_URL_MASSIVE_STOCKS = import.meta.env.VITE_API_URL_MASSIVE_STOCKS || 'http://localhost:8080/stocks';

export async function getTickers(filters: TickerFilters) {
    const cleanedParams = Object.fromEntries(
        Object.entries(filters).filter(([_, value]) => 
            value !== '' && value !== null && value !== undefined
        )
    );  

    return await axios.get(`${API_URL_MASSIVE_STOCKS}/tickers`, {
        params: cleanedParams
    });
}

export async function getTicker(symbol: string) {
    return await axios.get(`${API_URL_MASSIVE_STOCKS}/tickers/${symbol}`); 
}
