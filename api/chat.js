export default async function handler(req, res) {
    // CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    if (req.method === 'OPTIONS') return res.status(204).end();
    if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

    const apiKey = process.env.OPENAI_API_KEY || process.env.AI_API_KEY;
    if (!apiKey) return res.status(500).json({ error: "Lỗi: Chưa cấu hình OPENAI_API_KEY" });

    const apiUrl = process.env.OPENAI_API_URL || 'https://openrouter.ai/api/v1/chat/completions';
    const modelName = process.env.AI_MODEL || 'meta-llama/llama-3-8b-instruct:free';

    try {
        const { messages } = req.body;

        if (!messages || !Array.isArray(messages) || messages.length === 0) {
            return res.status(400).json({ error: "Thiếu messages trong request body" });
        }

        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`,
                'HTTP-Referer': 'https://if-you-fall.vercel.app', 
                'X-Title': 'If You Fall Game'
            },
            body: JSON.stringify({
                model: modelName,
                messages: messages
            })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error?.message || `Lỗi API: ${response.status}`);
        }

        return res.status(200).json({
            choices: [{
                message: { role: 'assistant', content: data.choices[0].message.content }
            }]
        });

    } catch (error) {
        console.error('API Error:', error.message);

        let userMsg = 'Lỗi kết nối AI.';
        if (error.message.includes('429') || error.message.includes('RESOURCE_EXHAUSTED')) {
            userMsg = 'Đã vượt giới hạn gọi API miễn phí. Vui lòng thử lại sau 1 phút.';
        } else if (error.message.includes('API_KEY') || error.message.includes('401')) {
            userMsg = 'API Key không hợp lệ hoặc đã hết hạn.';
        }

        return res.status(500).json({ error: userMsg, details: error.message });
    }
}