const express = require('express');
const router = express.Router();
const activityController = require('../controllers/activityController');

/**
 * @swagger
 * /api/activities/{id}:
 *   put:
 *     summary: Actualizar una actividad
 *     tags: [Activities]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la actividad
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               date:
 *                 type: string
 *                 format: date
 *     responses:
 *       200:
 *         description: Actividad actualizada
 *       400:
 *         description: Faltan campos obligatorios
 *       404:
 *         description: Actividad no encontrada
 *       500:
 *         description: Error del servidor
 */
router.put('/:id', activityController.updateActivity);
module.exports = router;