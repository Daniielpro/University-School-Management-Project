const express = require('express');
const { getTasks, createTask } = require('../controllers/taskController');
const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Task:
 *       type: object
 *       required:
 *         - title
 *         - date
 *       properties:
 *         id:
 *           type: string
 *           description: ID de la tarea
 *         title:
 *           type: string
 *           description: Título de la tarea
 *         description:
 *           type: string
 *           description: Descripción de la tarea
 *         date:
 *           type: string
 *           format: date
 *           description: Fecha de la tarea
 *         completed:
 *           type: boolean
 *           description: Si la tarea está completada
 *       example:
 *         title: Estudiar JavaScript
 *         description: Estudiar conceptos avanzados de JavaScript
 *         date: 2025-01-23T00:00:00.000Z
 *         completed: false
 */

/**
 * @swagger
 * /tasks:
 *   get:
 *     summary: Obtener todas las tareas
 *     responses:
 *       200:
 *         description: Lista de tareas
 */
router.get('/tasks', getTasks);

/**
 * @swagger
 * /tasks:
 *   post:
 *     summary: Crear una nueva tarea
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Task'
 *     responses:
 *       201:
 *         description: Tarea creada exitosamente
 */
router.post('/tasks', createTask);

module.exports = router;
