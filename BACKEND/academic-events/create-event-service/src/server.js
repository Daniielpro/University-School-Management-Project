const app = require('./app');

const PORT = process.env.PORT || 8093;

app.listen(PORT, () => {
    console.log(`🚀 Create Event Service running on http://34.236.1.24:${PORT}`);
});
