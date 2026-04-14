import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CourseService } from '../../core/services/course';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './courses.html',
  styleUrl: './courses.css'
})
export class CoursesComponent implements OnInit {
  courses: any[] = [];
  newCourse = { name: '', description: '' };
  progressMap: any = {};
  error = '';

  constructor(private courseService: CourseService) {}

  ngOnInit() { this.loadCourses(); }

  loadCourses() {
    this.courseService.getCourses().subscribe({
      next: (data: any[]) => this.courses = data,
      error: () => this.error = 'Error loading courses'
    });
  }

  createCourse() {
    if (!this.newCourse.name) { this.error = 'Enter course name'; return; }
    this.courseService.createCourse(this.newCourse).subscribe({
      next: () => { this.newCourse = { name: '', description: '' }; this.error = ''; this.loadCourses(); },
      error: () => this.error = 'Error creating course'
    });
  }

  deleteCourse(id: number) {
    this.courseService.deleteCourse(id).subscribe({
      next: () => this.loadCourses(),
      error: () => this.error = 'Error deleting course'
    });
  }

  updateProgress(courseId: number, percent: number) {
    this.courseService.updateProgress({ course: courseId, percent }).subscribe({
      next: () => this.progressMap[courseId] = percent,
      error: () => this.error = 'Error updating progress'
    });
  }
}