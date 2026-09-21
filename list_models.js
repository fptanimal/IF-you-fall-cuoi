const https = require('https');

const options = {
    hostname: 'generativelanguage.googleapis.com',
    port: 443,
    path: '/v1beta/models?key=' + process.env.GEMINI_API_KEY,
    method: 'GET'
};

const req = https.request(options, res => {
    let body = '';
    res.on('data', d => { body += d; });
    res.on('end', () => {
        try {
            const data = JSON.parse(body);
            if (data.models) {
                data.models.forEach(m => console.log(m.name, m.supportedGenerationMethods));
            } else {
                console.log(data);
            }
        } catch(e) {
            console.log(body);
        }
    });
});

req.on('error', error => {
    console.error(error);
});

req.end();
