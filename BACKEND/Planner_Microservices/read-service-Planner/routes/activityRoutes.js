const express = require('express');
const router = express.Router();
const activityController = require('../controllers/activityController');

/**
 * @swagger
 * /api/activities:
 *   get:
 *     summary: Obtener todas las actividades
 *     responses:
 *       200:
 *         description: Lista de actividades
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Activity'
 */
router.get('/activities', activityController.getActivities);

/**
 * @swagger
 * /api/activities/search:
 *   get:
 *     summary: Buscar actividades por título o descripción
 *     parameters:
 *       - in: query
 *         name: query
 *         required: true
 *         description: Término de búsqueda
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lista de actividades encontradas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Activity'
 */
router.get('/activities/search', activityController.searchActivities);
module.exports = router;