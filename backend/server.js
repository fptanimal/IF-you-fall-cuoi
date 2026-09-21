require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 8899;

// Middleware
app.use(cors());
app.use(express.json());

// Phục vụ giao diện Frontend (từ thư mục ../frontend)
app.use(express.static(path.join(__dirname, '../frontend')));

// ── HELPER: Gọi API tương thích chuẩn OpenAI (OpenRouter/Groq/etc) ──
async function callOpenAICompatibleAPI(messages, retries = 2) {
    const apiKey = process.env.OPENAI_API_KEY || process.env.AI_API_KEY;
    // Mặc định dùng OpenRouter với model miễn phí Llama 3
    const apiUrl = process.env.OPENAI_API_URL || 'https://openrouter.ai/api/v1/chat/completions';
    const modelName = process.env.AI_MODEL || 'meta-llama/llama-3-8b-instruct:free';

    if (!apiKey) throw new Error('NO_API_KEY');

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`,
                // Header tùy chọn cho OpenRouter
                'HTTP-Referer': 'http://localhost:8899', 
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

        return data.choices[0].message.content;
    } catch (error) {
        if ((error.message.includes('429') || error.message.includes('503')) && retries > 0) {
            console.log(`⏳ Rate limited or unavailable. Retrying in 5s... (${retries} retries left)`);
            await new Promise(r => setTimeout(r, 5000));
            return callOpenAICompatibleAPI(messages, retries - 1);
        }
        throw error;
    }
}

// ── API: GỌI AI CHATBOT ──
app.post('/api/chat', async (req, res) => {
    try {
        const { messages } = req.body;
        const aiText = await callOpenAICompatibleAPI(messages);

        // Trả về định dạng OpenAI-compatible cho frontend
        res.json({
            choices: [{
                message: { role: 'assistant', content: aiText }
            }]
        });

    } catch (error) {
        console.error('Backend Error:', error.message);

        // Trả lỗi rõ ràng để frontend fallback offline
        let userMsg = 'Lỗi kết nối AI.';
        if (error.message === 'NO_API_KEY') {
            userMsg = 'Chưa cấu hình API Key.';
        } else if (error.message.includes('429')) {
            userMsg = 'Đã vượt giới hạn gọi API miễn phí. Vui lòng thử lại sau 1 phút.';
        }

        res.status(500).json({ error: userMsg, details: error.message });
    }
});

// Chuyển hướng về trang chủ
app.use((req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

// Khởi động Server
app.listen(PORT, () => {
    const hasKey = !!(process.env.OPENAI_API_KEY || process.env.AI_API_KEY);
    console.log('\n  ╔══════════════════════════════════════════╗');
    console.log('  ║  IF YOU FALL — Backend Server             ║');
    console.log(`  ║  http://localhost:${PORT}                    ║`);
    console.log(`  ║  AI API: ${hasKey ? '✅ KEY OK' : '❌ NO KEY'}                            ║`);
    console.log('  ╚══════════════════════════════════════════╝\n');
});
