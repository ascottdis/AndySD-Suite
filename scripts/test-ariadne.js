const child_process = require('child_process');
const http = require('http');

const serverPath = 'apps/ariadne-api/server.js';
const PORT = process.env.PORT || 3004;
const URL = `http://localhost:${PORT}/health`;

function wait(ms){ return new Promise(r=>setTimeout(r, ms)); }

async function runTest(){
  console.log('Starting ariadne-api server...');
  const proc = child_process.spawn(process.execPath, [serverPath], {
    stdio: ['ignore','inherit','inherit']
  });

  let started = false;
  const start = Date.now();
  const timeoutMs = 10000;

  while(Date.now() - start < timeoutMs){
    try{
      await new Promise((resolve, reject)=>{
        const req = http.get(URL, (res) => {
          let data = '';
          res.on('data', chunk => data += chunk);
          res.on('end', () => {
            resolve({ statusCode: res.statusCode, body: data });
          });
        });
        req.on('error', err => reject(err));
      }).then(result => {
        if(result && result.statusCode === 200){
          console.log('Health check passed:', result.body);
          started = true;
        }
      });
    }catch(e){
      // not up yet
    }
    if(started) break;
    await wait(250);
  }

  if(!started){
    console.error('Server did not become healthy within timeout.');
    proc.kill();
    process.exit(2);
  }

  // If we reached here, test passed. Kill the server and exit 0.
  proc.kill();
  console.log('Test complete — ariadne-api is healthy.');
  process.exit(0);
}

runTest().catch(err => {
  console.error('Test runner error:', err);
  process.exit(1);
});
