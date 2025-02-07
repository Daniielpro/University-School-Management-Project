const express = require('express');
const app = express();
app.use(express.static('public'));

app.listen(8087, () => {
    console.log('Frontend corriendo en http://localhost:8087');
});