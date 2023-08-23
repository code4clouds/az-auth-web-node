
const express = require('express');
const { exec, spawn } = require('child_process');

const app = express();
const port = 3000;

let console_output = '';

// Serve static files from the "public" directory
app.use(express.static('public'));

app.post('/script', (req, res) => {

  const childProcess = spawn('pwsh',['createRG.ps']);

  childProcess.stdout.on('data', (data) => {
    const output = data.toString();
    
    console.debug(output);    
    console_output = console_output + `<pre>${output}</pre>`;
  });

  childProcess.stderr.on('data', (data) => {
    const errorOutput = data.toString();
    console.error(errorOutput);
    console_output = console_output + `<pre style="color: red;">${errorOutput}</pre>`;
  });

  childProcess.on('close', (code) => {
    console.debug(code);
    console_output = console_output + `<pre>CLI process exited with code ${code}</pre>`;
  });
  
});

// Serve the output of the console
app.get('/console', (req, res) => {
  res.write(console_output);
  res.end();
});

app.listen(port, () => {
  console.log(`Express app listening at http://localhost:${port}`);
});
