const express = require('express');
const router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('mongodb://<user>:<password>@ds141950.mlab.com:41950/mytasklist_thewebdeveloper', ['tasks']);

// testing api
router.get('/', (req, res, next) => {
    res.send('Express works');
});

// get all tasks
router.get('/tasks', (req, res, next) => {
    db.tasks.find((err, tasks) => {
        if (err) {
            res.send(err);
        }
        res.json(tasks);
    });
});

// get single Task
router.get('/task/:id', (req, res, next) => {
    db.tasks.findOne({_id: mongojs.ObjectId(req.params.id)}, (err, task) => {
        if(err){
            res.send(err);
        }
        res.json(task);
    });
});

// save Task
router.post('/task', (req, res, next) => {
    var task = req.body;
    if (!task.title || !(task.isDone + '')){
        res.status(400);
        res.json({
            "error": "Bad Data"
        });
    } else {
        db.tasks.save(task, (err, task) => {
            if(err){
                res.send(err);
            }
            res.json(task);
        });
    }
});

// Delete Task
router.delete('/task/:id', (req, res, next) => {
    db.tasks.remove({_id: mongojs.ObjectId(req.params.id)}, function(err, task){
        if(err){
            res.send(err);
        }
        res.json(task);
    });
});

// Update Task
router.put('/task/:id', (req, res, next) => {
    var task = req.body;
    var updatedTask = {};

    if(task.isDone){
        updatedTask.isDone = task.isDone;
    }

    if(task.title){
        updatedTask.title = task.title;
    }

    if(!updatedTask){
        res.status(400);
        res.json({
            "error":"Bad Data"
        });
    } else {
        db.tasks.update({_id: mongojs.ObjectId(req.params.id)},updatedTask, {}, (err, task) => {
            if(err){
                res.send(err);
            }
            res.json(task);
        });
    }
});

module.exports = router;
