const express = require('express');
const connectDB = require('./config/database');
const taskRoutes = require('./routes/taskRoutes');
const setupSwagger = require('./utils/swagger');

const app = express();
const PORT = 8080;

connectDB();

app.use(express.json());
app.use('/api', taskRoutes);

setupSwagger(app);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Swagger docs available at http://localhost:${PORT}/api-docs`);
});
