const https = require('https');

const CHAT_SYSTEM_PROMPT = `VAI TRÒ: Bạn là "Trợ lý sức khỏe AI"...`;

const data = JSON.stringify({
    messages: [
        { role: 'system', content: CHAT_SYSTEM_PROMPT },
        { role: 'user', content: 'hello' }
    ],
    patientSummary: 'Nhịp tim: 80',
    temperature: 0.2,
    top_p: 0.1,
    stream: false
});

const options = {
    hostname: 'ifyoufallhuhu.vercel.app',
    port: 443,
    path: '/api/chat',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(data)
    }
};

// We can't test 1.5-flash on Vercel unless we change api/chat.js first.
// Let's test it using a local direct API call to Google!
