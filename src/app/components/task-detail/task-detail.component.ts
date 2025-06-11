import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-task-detail',
  imports: [CommonModule, MatCardModule, MatButtonModule],
  templateUrl: './task-detail.component.html',
  styleUrl: './task-detail.component.css'
})
export class TaskDetailComponent {
task: any;
  constructor(private router: Router, private route: ActivatedRoute) {
    // In a real app, fetch from a service. Here, get from history state for demo.
    const nav = this.router.getCurrentNavigation();
    this.task = nav?.extras.state?.["task"];
    if (!this.task) {
      // fallback: try to get from route param or redirect
      this.router.navigate(['/tasks']);
    }
  }
  goBack() {
    this.router.navigate(['/tasks/create']);
  }
}
