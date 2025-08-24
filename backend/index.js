const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

app.get('/api', (req, res) => {
  res.send({ message: 'Backend is working!' });
});

app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
