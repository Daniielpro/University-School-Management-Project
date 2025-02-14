require('dotenv').config();
const app = require('./app');

const PORT = process.env.PORT || 8095;

app.listen(PORT, () => {
    console.log(`🚀 List Event Service running on http://34.236.1.24:${PORT}`);
});
