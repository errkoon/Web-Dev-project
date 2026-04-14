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

  ngOnInit() {
    this.loadTasks();
    this.loadCourses();
    this.loadDeadlines();
  }

  loadTasks() {
    this.taskService.getTasks().subscribe({
      next: (data) => this.tasks = data,
      error: () => this.error = 'Ошибка загрузки заданий'
    });
  }

  loadCourses() {
    this.taskService.getCourses().subscribe({
      next: (data) => this.courses = data
    });
  }

  loadDeadlines() {
    this.taskService.getDeadlines().subscribe({
      next: (data) => this.deadlines = data
    });
  }

  createTask() {
    if (!this.newTask.title || !this.newTask.course) {
      this.error = 'Заполните название и курс';
      return;
    }

    this.taskService.createTask(this.newTask).subscribe({
      next: () => {
        this.newTask = { title: '', course: '', priority: 'medium' };
        this.error = '';
        this.loadTasks();
      },
      error: () => this.error = 'Ошибка создания задания'
    });
  }

  completeTask(id: number) {
    this.taskService.completeTask(id).subscribe({
      next: () => this.loadTasks(),
      error: () => this.error = 'Ошибка обновления'
    });
  }

  deleteTask(id: number) {
    this.taskService.deleteTask(id).subscribe({
      next: () => this.loadTasks(),
      error: () => this.error = 'Ошибка удаления'
    });
  }

  addDeadline() {
    if (!this.newDeadline.task || !this.newDeadline.due_date) {
      this.error = 'Выберите задачу и дату';
      return;
    }

    this.taskService.createDeadline(this.newDeadline).subscribe({
      next: () => {
        this.newDeadline = { task: '', due_date: '', note: '' };
        this.error = '';
        this.loadDeadlines();
      },
      error: () => this.error = 'Ошибка дедлайна'
    });
  }
}