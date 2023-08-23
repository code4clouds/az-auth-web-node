
const express = require('express');
const { exec, spawn } = require('child_process');

const app = express();
const port = 3000;

// Serve static files from the "public" directory
app.use(express.static('public'));

app.get('/script', (req, res) => {

  const bashScript = 'ls -la'; // Replace with your CLI script

  // const childProcess = spawn('ls',['-la']);
  const childProcess = spawn('pwsh',['createRG.ps']);

  childProcess.stdout.on('data', (data) => {
    const output = data.toString();
    console.debug(output);
    res.write(`<pre>${output}</pre>`);
    res.end();
  });

  childProcess.stderr.on('data', (data) => {
    const errorOutput = data.toString();
    res.write(`<pre style="color: red;">${errorOutput}</pre>`);
  });

  childProcess.on('close', (code) => {
    res.write(`<pre>CLI process exited with code ${code}</pre>`);
    res.end();
  });
  // exec(bashScript, (error, stdout, stderr) => {
  //   if (error) {
  //     console.error('Error executing script:', error);
  //     return res.send('An error occurred while executing the script.');
  //   }

  //   const output = stdout || stderr || 'No output';
  //   res.send(`
  //     <html>
  //       <head>
  //         <title>CLI Command Output</title>
  //       </head>
  //       <body>
  //         <pre>${output}</pre>
  //       </body>
  //     </html>
  //   `);
  // });

});

// app.get('/update', (req, res) => {
//   res.
// }

app.listen(port, () => {
  console.log(`Express app listening at http://localhost:${port}`);
});
