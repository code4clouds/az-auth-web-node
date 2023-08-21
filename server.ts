
const express = require('express');
const { exec } = require('child_process');

const app = express();
const port = 3000;

// Serve static files from the "public" directory
app.use(express.static('public'));

app.get('/script', (req, res) => {

  const bashScript = 'ls -la'; // Replace with your CLI script
  
  exec(bashScript, (error, stdout, stderr) => {
    if (error) {
      console.error('Error executing script:', error);
      return res.send('An error occurred while executing the script.');
    }

    const output = stdout || stderr || 'No output';
    res.send(`
      <html>
        <head>
          <title>CLI Command Output</title>
        </head>
        <body>
          <pre>${output}</pre>
        </body>
      </html>
    `);
  });
});

app.listen(port, () => {
  console.log(`Express app listening at http://localhost:${port}`);
});
