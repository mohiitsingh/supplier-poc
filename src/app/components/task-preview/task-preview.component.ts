import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatChipsModule } from '@angular/material/chips';
import { MatBadgeModule } from '@angular/material/badge';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Router } from '@angular/router';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { TaskPreviewDialogComponent } from './task-preview-dialog/task-preview-dialog.component';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

interface Task {
  id: number;
  title: string;
  description: string;
  status: 'pending' | 'in-progress' | 'completed';
  priority: 'high' | 'medium' | 'low';
  dueDate: Date;
  assignedTo: string;
  category: string;
  attachments: number;
  comments: number;
  isCritical: boolean;
  isNew: boolean;
  lastViewed?: Date;
  needsFollowUp: boolean;
  createdAt: Date;
  region: string;
  createdBy: string;
  commentBy: string;
}

@Component({
  selector: 'app-task-preview',
  standalone: true,
  imports: [
    CommonModule, 
    MatCardModule, 
    MatDividerModule, 
    MatChipsModule, 
    MatBadgeModule,
    MatTooltipModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './task-preview.component.html',
  styleUrls: ['./task-preview.component.css']
})
export class TaskPreviewComponent {
  constructor(
    private router: Router, 
    private dialog: MatDialog,
    private fb: FormBuilder
  ) {
    this.createTaskForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      assignedTo: ['', Validators.required],
      region: ['', Validators.required],
      createdBy: ['', Validators.required],
      priority: ['medium', Validators.required],
      commentBy: ['', Validators.required]
    });
  }

  createTaskForm: FormGroup;
  selectedTask: Task | null = null;
  mode: 'view' | 'create' = 'view';
  attachedFiles: { name: string; size: number; type: string }[] = [];
  priorities = [
    { value: 'high', label: 'High' },
    { value: 'medium', label: 'Medium' },
    { value: 'low', label: 'Low' }
  ];

  tasks: Task[] = [
    {
      id: 1,
      title: 'Review Material Specifications',
      description: 'Review and approve the updated material specifications for Q2 2024 production. Changes include new sustainability requirements and quality standards. Please check all technical parameters and environmental compliance.',
      status: 'pending',
      priority: 'high',
      dueDate: new Date('2024-04-15'),
      assignedTo: 'John Smith',
      category: 'Quality Control',
      attachments: 3,
      comments: 5,
      isCritical: true,
      isNew: true,
      needsFollowUp: false,
      createdAt: new Date('2024-03-25'),
      region: 'North America',
      createdBy: 'John Doe',
      commentBy: 'Sarah Johnson'
    },
    {
      id: 2,
      title: 'Update Supplier Documentation',
      description: 'Update supplier documentation with new ISO certifications and compliance records. Ensure all certificates are current and meet our quality standards. Update digital copies in the system.',
      status: 'in-progress',
      priority: 'medium',
      dueDate: new Date('2024-04-20'),
      assignedTo: 'Sarah Johnson',
      category: 'Documentation',
      attachments: 2,
      comments: 3,
      isCritical: false,
      isNew: false,
      lastViewed: new Date('2024-03-20'),
      needsFollowUp: true,
      createdAt: new Date('2024-03-15'),
      region: 'Europe',
      createdBy: 'Sarah Johnson',
      commentBy: 'John Smith'
    },
    {
      id: 3,
      title: 'Price Negotiation Meeting',
      description: 'Prepare and attend price negotiation meeting for raw materials supply for Q3 2024. Review current market rates, prepare cost analysis, and outline volume discounts structure.',
      status: 'pending',
      priority: 'high',
      dueDate: new Date('2024-04-18'),
      assignedTo: 'Mike Wilson',
      category: 'Procurement',
      attachments: 4,
      comments: 7,
      isCritical: true,
      isNew: true,
      needsFollowUp: false,
      createdAt: new Date('2024-03-24'),
      region: 'Asia',
      createdBy: 'Mike Wilson',
      commentBy: 'Sarah Johnson'
    },
    {
      id: 4,
      title: 'Quality Audit Preparation',
      description: 'Prepare documentation and samples for upcoming quality audit. Ensure all quality control records are up to date and properly organized. Coordinate with quality team for sample collection.',
      status: 'in-progress',
      priority: 'medium',
      dueDate: new Date('2024-04-25'),
      assignedTo: 'Emily Brown',
      category: 'Quality Control',
      attachments: 6,
      comments: 4,
      isCritical: false,
      isNew: false,
      lastViewed: new Date('2024-03-22'),
      needsFollowUp: false,
      createdAt: new Date('2024-03-10'),
      region: 'North America',
      createdBy: 'Emily Brown',
      commentBy: 'Sarah Johnson'
    },
    {
      id: 5,
      title: 'Delivery Schedule Review',
      description: 'Review and optimize delivery schedule for May 2024. Coordinate with logistics team to ensure timely deliveries and optimize transportation costs. Update delivery slots in the system.',
      status: 'pending',
      priority: 'low',
      dueDate: new Date('2024-04-30'),
      assignedTo: 'David Clark',
      category: 'Logistics',
      attachments: 2,
      comments: 3,
      isCritical: false,
      isNew: false,
      lastViewed: new Date('2024-03-18'),
      needsFollowUp: true,
      createdAt: new Date('2024-03-01'),
      region: 'Europe',
      createdBy: 'David Clark',
      commentBy: 'Sarah Johnson'
    }
  ];

  setMode(mode: 'view' | 'create') {
    this.mode = mode;
    if (mode === 'create') {
      this.selectedTask = null;
      this.createTaskForm.reset();
      this.attachedFiles = [];
    }
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      const files = Array.from(input.files);
      files.forEach(file => {
        this.attachedFiles.push({
          name: file.name,
          size: file.size,
          type: file.type
        });
      });
    }
  }

  removeFile(index: number) {
    this.attachedFiles.splice(index, 1);
  }

  formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  exportTask() {
    const taskData = {
      ...this.createTaskForm.value,
      attachments: this.attachedFiles
    };
    
    const blob = new Blob([JSON.stringify(taskData, null, 2)], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `task-${new Date().getTime()}.json`;
    link.click();
    window.URL.revokeObjectURL(url);
  }

  onSubmit() {
    if (this.createTaskForm.valid) {
      const newTask: Task = {
        id: this.tasks.length + 1,
        ...this.createTaskForm.value,
        status: 'pending',
        priority: 'medium',
        dueDate: new Date(),
        category: 'General',
        attachments: this.attachedFiles.length,
        comments: 0,
        isCritical: false,
        isNew: true,
        needsFollowUp: false,
        createdAt: new Date(),
        region: 'North America',
        createdBy: 'John Doe',
        commentBy: 'Sarah Johnson'
      };
      
      this.tasks.unshift(newTask);
      this.setMode('view');
    }
  }

  openPreviewDialog(task: Task, event: MouseEvent) {
    event.stopPropagation();
    this.dialog.open(TaskPreviewDialogComponent, {
      data: { task },
      width: '600px',
      maxWidth: '90vw',
      autoFocus: false
    });
  }

  goToTask(task: Task) {
    this.router.navigate(['/tasks', task.id]);
  }

  getPriorityClass(priority: 'high' | 'medium' | 'low'): string {
    const classes: Record<'high' | 'medium' | 'low', string> = {
      high: 'priority-high',
      medium: 'priority-medium',
      low: 'priority-low'
    };
    return classes[priority];
  }

  getStatusClass(status: 'pending' | 'in-progress' | 'completed'): string {
    const classes: Record<'pending' | 'in-progress' | 'completed', string> = {
      'pending': 'status-pending',
      'in-progress': 'status-progress',
      'completed': 'status-completed'
    };
    return classes[status];
  }

  getTimeAgo(date: Date): string {
    const now = new Date();
    const diff = now.getTime() - new Date(date).getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    if (days === 0) return 'Today';
    if (days === 1) return 'Yesterday';
    if (days < 7) return `${days} days ago`;
    if (days < 30) return `${Math.floor(days / 7)} weeks ago`;
    return `${Math.floor(days / 30)} months ago`;
  }
}
