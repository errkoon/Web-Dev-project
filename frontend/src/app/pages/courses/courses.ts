import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CourseService } from '../../core/services/course';
import { TaskService } from '../../core/services/task';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './courses.html',
  styleUrls: ['./courses.css']
})
export class CoursesComponent implements OnInit {
  newCourse = { name: '', description: '' };
  courses: any[] = [];
  tasks: any[] = [];
  error: string = '';
  progressMap: { [key: number]: number } = {};

  constructor(
    private courseService: CourseService,
    private taskService: TaskService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.loadCourses();
  }

  loadCourses() {
    this.courseService.getCourses().subscribe({
      next: (data: any[]) => {
        this.courses = data;
        this.error = '';
      
        this.taskService.getTasks().subscribe({
          next: (tasks: any[]) => {
            this.tasks = tasks;
            this.calcProgress();
            this.cdr.detectChanges();
          },
          error: () => {}
        });
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.error = 'Error loading courses: ' + err.status;
      }
    });
  }

  calcProgress() {
    this.courses.forEach(course => {
      const courseTasks = this.tasks.filter(t => t.course === course.id);
      if (courseTasks.length === 0) {
        this.progressMap[course.id] = 0;
      } else {
        const completed = courseTasks.filter(t => t.is_completed).length;
        this.progressMap[course.id] = Math.round((completed / courseTasks.length) * 100);
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
        delete this.progressMap[id];
        this.cdr.detectChanges();
      },
      error: () => this.error = 'Error deleting course'
    });
  }
}