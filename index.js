const express = require('express');
const app = express();
app.get('/', (req, res) => {
    res.send("Hello at index page");
})
app.listen(3000);