const http = require('http');

const data = JSON.stringify({
    messages: [
        { role: 'system', content: 'SYSTEM PROMPT' },
        { role: 'user', content: 'hello' }
    ],
    patientSummary: 'Nhịp tim: 80',
    temperature: 0.2,
    top_p: 0.1,
    stream: false
});

function testApi(port) {
    const options = {
        hostname: 'localhost',
        port: port,
        path: '/api/chat',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(data)
        }
    };

    const req = http.request(options, res => {
        console.log(`Port ${port} statusCode: ${res.statusCode}`);
        let body = '';
        res.on('data', d => { body += d; });
        res.on('end', () => console.log(`Port ${port} body:`, body.substring(0, 200)));
    });

    req.on('error', error => {
        console.log(`Port ${port} error:`, error.message);
    });

    req.write(data);
    req.end();
}

testApi(3000); // Vercel Dev
testApi(8899); // Backend Node Server
