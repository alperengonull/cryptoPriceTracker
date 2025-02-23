import axios from 'axios';
import { COINGECKO_API_URL } from '@env';

export const fetchCoinData = async (coinId) => {
    try {
        const response = await axios.get(`${COINGECKO_API_URL}/coins/${coinId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching coin data:', error);
        throw error;
    }
};

export const fetchCryptoMarkets = async () => {
    try {
        const response = await axios.get(`${COINGECKO_API_URL}/coins/markets`, {
            params: {
                vs_currency: 'usd',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching crypto markets:', error);
        throw error;
    }
};

export const fetchCoinMarketChart = async (coinId) => {
    try {
        const response = await axios.get(`${COINGECKO_API_URL}/coins/${coinId}/market_chart`, {
            params: {
                vs_currency: 'usd',
                days: '30', // Son 30 günün verilerini al
            },
        });
        return response.data.prices.map(([timestamp, price]) => ({
            value: price,
            date: new Date(timestamp).toLocaleDateString(),
        }));
    } catch (error) {
        console.error('Error fetching coin market chart:', error);
        throw error;
    }
};
