import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth';
import { CourseService } from '../../core/services/course';
import { TaskService } from '../../core/services/task';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class DashboardComponent implements OnInit {
  profile: any = null;
  error = '';
  coursesCount = 0;
  tasksDoneCount = 0;
  deadlinesCount = 0;

  constructor(
    private auth: AuthService,
    private courseService: CourseService,
    private taskService: TaskService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.auth.getProfile().subscribe({
      next: (data: any) => {
        this.profile = data;
        this.cdr.detectChanges();
      },
      error: () => {
        this.error = 'Failed to load profile';
        this.cdr.detectChanges();
      }
    });

    this.courseService.getCourses().subscribe({
      next: (data: any[]) => {
        this.coursesCount = data.length;
        this.cdr.detectChanges();
      },
      error: () => {}
    });

    this.taskService.getTasks().subscribe({
      next: (data: any[]) => {
        this.tasksDoneCount = data.filter((t: any) => t.is_completed).length;
        this.cdr.detectChanges();
      },
      error: () => {}
    });

    this.taskService.getDeadlines().subscribe({
      next: (data: any[]) => {
        this.deadlinesCount = data.length;
        this.cdr.detectChanges();
      },
      error: () => {}
    });
  }

  logout() { this.auth.logout(); }
}