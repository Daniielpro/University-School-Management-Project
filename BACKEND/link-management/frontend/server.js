const express = require('express');
const app = express();
app.use(express.static('public'));

const PORT = process.env.PORT || 8087;

app.listen(PORT, () => {
    console.log(`Frontend corriendo en http://localhost:${PORT}`); 
}); 