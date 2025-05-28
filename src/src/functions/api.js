import axios from "axios"
const API_URL = 'https://deepseek-v3.p.rapidapi.com/chat';
const API_KEY = '6ef4ad0a16msh1fe61cc2f95c0fcp19ce78jsnc57caec7e8c2';
export const fetchChatResponse = async (message, learningData) => {
    const data = {
        messages: [
            {
                role: 'user',
                content: `${message}, and here's my learning style: ${learningData}`,
            },
        ],
    };
    const headers = {
        'x-rapidapi-key': API_KEY,
        'x-rapidapi-host': 'deepseek-v3.p.rapidapi.com',
        'Content-Type': 'application/json',
    };
    try {
        const response = await axios.post(API_URL, data, { headers });
        return response.data;
    } catch (error) {
        console.error('Error fetching chat response:', error);
        throw error;
    }
};