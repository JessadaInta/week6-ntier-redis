// src/controllers/taskController.js
const taskService = require('../services/taskService');
const { setCache } = require('../config/redis');

exports.getTaskById = async (req, res, next) => {
    try {
        const id = req.params.id;

        const task = await taskService.getTaskById(id);

        // Save to cache (TTL 60)
        await setCache(`tasks:${id}`, task, 60);

        res.json(task);

    } catch (err) {
        next(err);
    }
};

class TaskController {
    async getAllTasks(req, res, next) {
        try {
            const tasks = await taskService.getAllTasks();
            res.json({ success: true, data: tasks, count: tasks.length });
        } catch (error) { next(error); }
    }

    async getTaskById(req, res, next) {
        try {
            const task = await taskService.getTaskById(parseInt(req.params.id));
            res.json({ success: true, data: task });
        } catch (error) { next(error); }
    }

    async createTask(req, res, next) {
        try {
            const task = await taskService.createTask(req.body);
            res.status(201).json({ success: true, data: task });
        } catch (error) { next(error); }
    }

    async updateTask(req, res, next) {
        try {
            const task = await taskService.updateTask(parseInt(req.params.id), req.body);
            res.json({ success: true, data: task });
        } catch (error) { next(error); }
    }

    async deleteTask(req, res, next) {
        try {
            await taskService.deleteTask(parseInt(req.params.id));
            res.json({ success: true, message: 'Task deleted successfully' });
        } catch (error) { next(error); }
    }

    async getStatistics(req, res, next) {
        try {
            const stats = await taskService.getStatistics();
            res.json({ success: true, data: stats });
        } catch (error) { next(error); }
    }
}

module.exports = new TaskController();
