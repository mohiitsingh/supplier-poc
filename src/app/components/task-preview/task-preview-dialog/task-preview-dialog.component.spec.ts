import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskPreviewDialogComponent } from './task-preview-dialog.component';

describe('TaskPreviewDialogComponent', () => {
  let component: TaskPreviewDialogComponent;
  let fixture: ComponentFixture<TaskPreviewDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskPreviewDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskPreviewDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
