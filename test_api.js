const https = require('https');

const data = JSON.stringify({
    messages: [{ role: 'user', content: 'hello' }]
});

const options = {
    hostname: 'ifyoufallhuhu.vercel.app',
    port: 443,
    path: '/api/chat',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Content-Length': data.length
    }
};

const req = https.request(options, res => {
    console.log(`statusCode: ${res.statusCode}`);
    let body = '';
    res.on('data', d => { body += d; });
    res.on('end', () => console.log('body:', body));
});

req.on('error', error => {
    console.error(error);
});

req.write(data);
req.end();
