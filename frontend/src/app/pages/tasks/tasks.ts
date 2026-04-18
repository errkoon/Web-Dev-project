import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
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
  newTask = { title: '', course: '', priority: '' };
  newDeadline = { task: '', due_date: '', note: '' };
  error = '';

  constructor(private taskService: TaskService, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.loadTasks();
    this.loadCourses();
    this.loadDeadlines();
  }

  loadTasks() {
    this.taskService.getTasks().subscribe({
      next: (data) => {
        this.tasks = data;
        this.cdr.detectChanges();
      },
      error: () => this.error = 'Error loading tasks'
    });
  }

  loadCourses() {
    this.taskService.getCourses().subscribe({
      next: (data) => {
        this.courses = data;
        this.cdr.detectChanges();
      }
    });
  }

  loadDeadlines() {
    this.taskService.getDeadlines().subscribe({
      next: (data) => {
        this.deadlines = data;
        this.cdr.detectChanges();
      }
    });
  }

  createTask() {
    if (!this.newTask.title || !this.newTask.course) {
      this.error = 'Please fill in the title and course';
      return;
    }
    this.taskService.createTask(this.newTask).subscribe({
      next: () => {
        this.newTask = { title: '', course: '', priority: '' };
        this.error = '';
        this.loadTasks();
      },
      error: () => this.error = 'Error creating task'
    });
  }

  completeTask(id: number) {
    this.taskService.completeTask(id).subscribe({
      next: () => this.loadTasks(),
      error: () => this.error = 'Error updating task'
    });
  }

   private deletingIds = new Set<number>();

  deleteTask(id: number, event?: Event) {
    if (event) event.stopPropagation();
    if (this.deletingIds.has(id)) return;
    this.deletingIds.add(id);
    this.taskService.deleteTask(id).subscribe({
      next: () => {
        this.tasks = this.tasks.filter(t => t.id !== id);
        this.deadlines = this.deadlines.filter(d => d.task !== id);
        this.deletingIds.delete(id);
      },
      error: () => {
        this.error = 'Error deleting task';
        this.deletingIds.delete(id);
      }
    });
  }
   

  addDeadline() {
    if (!this.newDeadline.task || !this.newDeadline.due_date) {
      this.error = 'Please select a task and date';
      return;
    }
    this.taskService.createDeadline(this.newDeadline).subscribe({
      next: () => {
        this.newDeadline = { task: '', due_date: '', note: '' };
        this.error = '';
        this.loadDeadlines();
      },
      error: () => this.error = 'Error adding deadline'
    });
  }
}