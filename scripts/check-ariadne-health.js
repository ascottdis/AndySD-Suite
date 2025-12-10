const http = require('http');

const PORT = process.env.PORT || 3004;
const URL = `http://localhost:${PORT}/health`;

const req = http.get(URL, (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    if(res.statusCode === 200){
      console.log('OK:', data);
      process.exit(0);
    } else {
      console.error('Unexpected status:', res.statusCode, data);
      process.exit(2);
    }
  });
});

req.on('error', (err) => {
  console.error('Request error:', err.message);
  process.exit(1);
});
