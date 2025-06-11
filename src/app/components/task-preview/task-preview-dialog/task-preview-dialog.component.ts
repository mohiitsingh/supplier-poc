import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-preview-dialog',
  imports: [CommonModule, MatCardModule, MatDividerModule],
  templateUrl: './task-preview-dialog.component.html',
  styleUrl: './task-preview-dialog.component.css'
})
export class TaskPreviewDialogComponent {
constructor(
    public dialogRef: MatDialogRef<TaskPreviewDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
}
