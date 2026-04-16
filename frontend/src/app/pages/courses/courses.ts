import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CourseService } from '../../core/services/course';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './courses.html',   
  styleUrls: ['./courses.css']
})
export class CoursesComponent implements OnInit {

  newCourse = {
    name: '',
    description: ''
  };

  courses: any[] = [];
  error: string = '';

  progressMap: { [key: number]: number } = {};

  constructor(private courseService: CourseService) {
    this.loadCourses(); 
  }

  ngOnInit() {
    this.loadCourses();
  }

  loadCourses() {
  this.courseService.getCourses().subscribe({
    next: (data: any[]) => {
      this.courses = data;
      this.error = '';
    },
    error: (err) => {
      this.error = 'Error loading courses: ' + err.status;
    }
  });
}

  createCourse() {
    if (!this.newCourse.name) {
      this.error = 'Enter the name';
      return;
    }

    this.courseService.createCourse(this.newCourse).subscribe({
      next: () => {
        this.newCourse = { name: '', description: '' };
        this.error = '';
        this.loadCourses();
      },
      error: () => this.error = 'Creation error'
    });
  }

  deleteCourse(id: number) {
  this.courseService.deleteCourse(id).subscribe({
    next: () => {
      this.courses = this.courses.filter(c => c.id !== id);
      this.loadCourses();
    },
    error: () => this.error = 'Error deleting course'
  });
}

  updateProgress(id: number, value: number) {
    this.courseService.updateProgress({
      course: id,
      percent: value
    }).subscribe({
      next: () => this.progressMap[id] = value,
      error: () => this.error = 'Progress error'
    });
  }
}