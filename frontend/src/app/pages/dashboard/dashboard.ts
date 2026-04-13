import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  profile: any = null;
  error = '';

  constructor(private auth: AuthService) {}

  ngOnInit() {
    this.auth.getProfile().subscribe({
      next: (data) => this.profile = data,
      error: () => this.error = 'Failed to load profile'
    });
  }

  logout() {
    this.auth.logout();
  }
}