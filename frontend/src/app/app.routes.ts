import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login';
import { DashboardComponent } from './pages/dashboard/dashboard';
import { CoursesComponent } from './pages/courses/courses';
import { TasksComponent } from './pages/tasks/tasks';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'courses', component: CoursesComponent },
  { path: 'tasks', component: TasksComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' }
];