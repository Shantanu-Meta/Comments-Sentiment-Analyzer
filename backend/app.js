// app.js
const express = require('express');
const mongoose = require('mongoose');
const scraperRoutes = require('./routes/scraper');
const cors = require("cors");
require('dotenv').config(); 
const app = express();
app.use(express.json());
app.use(cors());
// mongoose.connect(process.env.MONGO_URI);
app.use('/api', scraperRoutes);

app.get('/', (req, res) => {
  res.send('Welcome to the sentiment analyzer web app');
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server on port http://localhost:${PORT}`));
