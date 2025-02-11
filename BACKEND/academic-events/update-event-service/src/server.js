require('dotenv').config();
const app = require('./app');

const PORT = process.env.PORT || 8096;

app.listen(PORT, () => {
    console.log(`🚀 Update Event Service running on http://localhost:${PORT}`);
});
