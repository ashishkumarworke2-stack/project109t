// server.js
const express = require('express');
const app = express();

app.get('/api/rpc', async (req, res) => {
  const response = await fetch('https://mainnet.helius-rpc.com/?api-key=70da5c4d-b87b-4842-bfd5-a9977e4aed1c', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(req.body)
  });
  const data = await response.json();
  res.json(data);
});

app.listen(3001);
