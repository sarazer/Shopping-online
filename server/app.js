const express = require('express');
const path = require('path')
const fs = require('fs');
const cors = require('cors');

const login = require('./login');
const api = require('./api');
const uploading = require('./uploading');

const app = express();
const PORT = 8080;

const root = path.join(__dirname, '../','dist/shopping-online');

app.use(cors());
app.use(express.static(root));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(api);
app.use(login.router);

app.use(uploading);

app.get('*', (req, res) => {
    res.sendFile('index.html', { root });
});

app.listen(PORT, () => {
    console.log(`${PORT} is ready`);
});

