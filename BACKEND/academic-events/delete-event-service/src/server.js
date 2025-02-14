require('dotenv').config();
const app = require('./app');

const PORT = process.env.PORT || 8094;

app.listen(PORT, () => {
    console.log(`🚀 Delete Event Service running on http://34.236.1.24:${PORT}`);
});
