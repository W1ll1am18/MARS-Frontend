import axios from "axios";

const API_URL_ML = 'http://localhost:8080/';

export async function getPrediction(ticker: string, horizon: number) {
    return await axios.get(`${API_URL_ML}predict/${ticker}/${horizon}`); 
}