import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../../core/services/task';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './tasks.html',
  styleUrl: './tasks.css'
})
export class TasksComponent implements OnInit {
  tasks: any[] = [];
  courses: any[] = [];
  deadlines: any[] = [];
  newTask = { title: '', course: '', priority: 'medium' };
  newDeadline = { task: '', due_date: '', note: '' };
  error = '';

  constructor(private taskService: TaskService) {}

  ngOnInit() { this.loadTasks(); this.loadCourses(); this.loadDeadlines(); }

  loadTasks() {
    this.taskService.getTasks().subscribe({
      next: (data: any[]) => this.tasks = data,
      error: () => this.error = 'Error loading tasks'
    });
  }

  loadCourses() {
    this.taskService.getCourses().subscribe({
      next: (data: any[]) => this.courses = data,
      error: () => {}
    });
  }

  loadDeadlines() {
    this.taskService.getDeadlines().subscribe({
      next: (data: any[]) => this.deadlines = data,
      error: () => {}
    });
  }

  createTask() {
    if (!this.newTask.title || !this.newTask.course) { this.error = 'Fill in title and course'; return; }
    this.taskService.createTask(this.newTask).subscribe({
      next: () => { this.newTask = { title: '', course: '', priority: 'medium' }; this.error = ''; this.loadTasks(); },
      error: () => this.error = 'Error creating task'
    });
  }

  completeTask(id: number) {
    this.taskService.completeTask(id).subscribe({
      next: () => this.loadTasks(),
      error: () => this.error = 'Error updating task'
    });
  }

  deleteTask(id: number) {
    this.taskService.deleteTask(id).subscribe({
      next: () => this.loadTasks(),
      error: () => this.error = 'Error deleting task'
    });
  }

  addDeadline() {
    if (!this.newDeadline.task || !this.newDeadline.due_date) { this.error = 'Select task and date'; return; }
    this.taskService.createDeadline(this.newDeadline).subscribe({
      next: () => { this.newDeadline = { task: '', due_date: '', note: '' }; this.error = ''; this.loadDeadlines(); },
      error: () => this.error = 'Error adding deadline'
    });
  }
}