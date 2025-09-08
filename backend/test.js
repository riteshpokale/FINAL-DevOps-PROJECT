const http = require('http');

const options = {
  hostname: 'localhost',
  port: 8080,
  path: '/api/health',
  method: 'GET'
};

const req = http.request(options, res => {
  if (res.statusCode === 200) {
    console.log('Backend test passed');
    process.exit(0);
  } else {
    console.error('Backend test failed');
    process.exit(1);
  }
});

req.on('error', error => {
  console.error('Backend test error', error);
  process.exit(1);
});

req.end();
