const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const cacheMiddleware = require('../middleware/cacheMiddleware');

router.get('/stats', taskController.getStatistics);
router.get('/', taskController.getAllTasks);

router.get(
  '/:id(\\d+)',
  cacheMiddleware((req) => `tasks:${req.params.id}`),
  taskController.getTaskById
);

router.post('/', taskController.createTask);
router.put('/:id(\\d+)', taskController.updateTask);
router.delete('/:id(\\d+)', taskController.deleteTask);

module.exports = router;