require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connection = require('./database/db');
const app = express();

app.use(cors());
app.use(express.json());
app.use('/news', require('./routes/newsRoute'));
const PORT = process.env.PORT || 8000;

connection();
app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));