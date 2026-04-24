import axios from "axios";
import type { TickerFilters } from "../pages/Tickers";

const API_URL = 'http://localhost:8080/stocks';

export async function getTickers(filters: TickerFilters) {
    const cleanedParams = Object.fromEntries(
        Object.entries(filters).filter(([_, value]) => 
            value !== '' && value !== null && value !== undefined
        )
    );  

    return await axios.get(`${API_URL}/tickers`, {
        params: cleanedParams
    });
}
