import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule, RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  requestStats = {
    new: 5,
    inProgress: 8,
    closed: 12
  };

  ngOnInit() {
    this.createChart();
  }

  createChart() {
    const ctx = document.getElementById('requestChart') as HTMLCanvasElement;
    new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['New', 'In Progress', 'Closed'],
        datasets: [{
          data: [this.requestStats.new, this.requestStats.inProgress, this.requestStats.closed],
          backgroundColor: ['#2196F3', '#FFC107', '#4CAF50']
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false
      }
    });
  }
}
