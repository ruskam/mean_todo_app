import { Component, OnInit } from '@angular/core';
import { TasksService } from '../tasks.service';
import { Task } from '../../Task';

@Component({
    selector: 'tasks',
    templateUrl: './tasks.component.html',
    styleUrls: ['./tasks.component.css']
})

export class TasksComponent implements OnInit {
    tasks: Task[];
    title: string;

    constructor(private tasksService: TasksService) { }

    ngOnInit() {
        this.tasksService.getAllTasks().subscribe(tasks =>{
            this.tasks = tasks;
        });
    }

    addTask(event) {
        event.preventDefault();
        var newTask = {
            title: this.title,
            isDone:  false
        }

        this.tasksService.addTask(newTask).subscribe(task => {
            this.tasks.push(task);
            this.title = '';
        });
    }

    deleteTask(id){
        var tasks = this.tasks;

        this.tasksService.deleteTask(id).subscribe(data => {
            if (data.n == 1) {
                for (var i = 0; i < tasks.length; i++) {
                    if (tasks[i]._id == id) {
                        tasks.splice(i, 1);
                    }
                }
            }
        })
    }

    updateStatus(task) {
        var _task = {
            _id: task.id,
            title: task.title,
            isDone: !task.isDone
        };

        this.tasksService.updateStatus(_task).subscribe(data => {
            task.isDone = !task.isDone;
        });
    }
}

/*
constructor(private taskService:TasksService){
        this.taskService.getAllTasks()
            .subscribe(tasks => {
                this.tasks = tasks;
            })
        }
*/
