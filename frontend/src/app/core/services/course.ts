import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class CourseService {
  private url = 'http://localhost:8000/api/courses/';
  private progressUrl = 'http://localhost:8000/api/progress/';

  constructor(private http: HttpClient) {}

  getCourses() { return this.http.get<any[]>(this.url); }
  createCourse(data: any) { return this.http.post(this.url, data); }
  deleteCourse(id: number) { return this.http.delete(`${this.url}${id}/`); }
  updateCourse(id: number, data: any) { return this.http.put(`${this.url}${id}/`, data); }
  getProgress() { return this.http.get<any[]>(this.progressUrl); }
  updateProgress(data: any) { return this.http.post(this.progressUrl, data); }
}