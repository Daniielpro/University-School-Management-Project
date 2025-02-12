const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const connectDB = require('./config/db');
const path = require('path');

const app = express();
const port = 3010;
connectDB(); 

const operationSchema = new mongoose.Schema({
    type: String,
    a: Number,
    b: Number,
    result: Number,
    createdAt: { type: Date, default: Date.now },
});
 
const Operation = mongoose.model('Operation', operationSchema);

app.use(cors());
app.use(express.json());

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Calculator API',
            version: '1.0.0',
            description: 'A simple calculator API',
        },
    },
    apis: ['./server.js'],
};

const specs = swaggerJsdoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
app.use(express.static(path.join(__dirname, 'public')));

/**
 * @swagger
 * /add:
 *   get:
 *     summary: Adds two numbers
 *     parameters:
 *       - in: query
 *         name: a
 *         required: true
 *         schema:
 *           type: number
 *         description: The first number
 *       - in: query
 *         name: b
 *         required: true
 *         schema:
 *           type: number
 *         description: The second number
 *     responses:
 *       200:
 *         description: The result of the addition
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: number
 */
app.get('/add', async (req, res) => {
    const { a, b } = req.query;
    const result = parseFloat(a) + parseFloat(b);
    const operation = new Operation({ type: 'add', a, b, result });
    await operation.save();
    res.json({ result });
});

/**
 * @swagger
 * /subtract:
 *   get:
 *     summary: Subtracts one number from another
 *     parameters:
 *       - in: query
 *         name: a
 *         required: true
 *         schema:
 *           type: number
 *         description: The first number
 *       - in: query
 *         name: b
 *         required: true
 *         schema:
 *           type: number
 *         description: The second number
 *     responses:
 *       200:
 *         description: The result of the subtraction
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: number 
 */
app.get('/subtract', async (req, res) => {
    const { a, b } = req.query;
    const result = parseFloat(a) - parseFloat(b);
    const operation = new Operation({ type: 'subtract', a, b, result });
    await operation.save();
    res.json({ result });
});

/**
 * @swagger
 * /multiply:
 *   get:
 *     summary: Multiplies two numbers
 *     parameters:
 *       - in: query
 *         name: a
 *         required: true
 *         schema:
 *           type: number
 *         description: The first number
 *       - in: query
 *         name: b
 *         required: true
 *         schema:
 *           type: number
 *         description: The second number
 *     responses:
 *       200:
 *         description: The result of the multiplication
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: number
 */
app.get('/multiply', async (req, res) => {
    const { a, b } = req.query;
    const result = parseFloat(a) * parseFloat(b);
    const operation = new Operation({ type: 'multiply', a, b, result });
    await operation.save();
    res.json({ result });
});

/**
 * @swagger
 * /divide:
 *   get:
 *     summary: Divides one number by another
 *     parameters:
 *       - in: query
 *         name: a
 *         required: true
 *         schema:
 *           type: number
 *         description: The first number
 *       - in: query
 *         name: b
 *         required: true
 *         schema:
 *           type: number
 *         description: The second number
 *     responses:
 *       200:
 *         description: The result of the division
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: number
 *       400:
 *         description: Division by zero is not allowed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */
app.get('/divide', async (req, res) => {
    const { a, b } = req.query;
    if (parseFloat(b) === 0) {
        res.status(400).json({ error: 'Division by zero is not allowed' });
    } else {
        const result = parseFloat(a) / parseFloat(b);
        const operation = new Operation({ type: 'divide', a, b, result });
        await operation.save();
        res.json({ result });
    }
});

/**
 * @swagger
 * /history:
 *   get:
 *     summary: Retrieves the history of operations
 *     responses:
 *       200:
 *         description: The list of operations
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   type:
 *                     type: string
 *                   a:
 *                     type: number
 *                   b:
 *                     type: number
 *                   result:
 *                     type: number
 *                   createdAt: 
 *                     type: string
 *                     format: date-time
 */
app.get('/history', async (req, res) => {
    const operations = await Operation.find().sort({ createdAt: -1 });
    res.json({ operations });
});
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
    console.log(`Calculator microservice is running on port ${port}`);
});
