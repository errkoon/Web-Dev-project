import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class TaskService {
  private taskUrl = 'http://localhost:8000/api/tasks/';
  private deadlineUrl = 'http://localhost:8000/api/deadlines/';
  private courseUrl = 'http://localhost:8000/api/courses/';

  constructor(private http: HttpClient) {}

  getTasks() { return this.http.get<any[]>(this.taskUrl); }
  createTask(data: any) { return this.http.post(this.taskUrl, data); }
  completeTask(id: number) { return this.http.patch(`${this.taskUrl}${id}/`, { is_completed: true }); }
  deleteTask(id: number) { return this.http.delete(`${this.taskUrl}${id}/`); }
  getCourses() { return this.http.get<any[]>(this.courseUrl); }
  createDeadline(data: any) { return this.http.post(this.deadlineUrl, data); }
  getDeadlines() { return this.http.get<any[]>(this.deadlineUrl); }
}