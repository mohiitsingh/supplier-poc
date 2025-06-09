import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerformanceMatrixComponent } from './performance-matrix.component';

describe('PerformanceMatrixComponent', () => {
  let component: PerformanceMatrixComponent;
  let fixture: ComponentFixture<PerformanceMatrixComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PerformanceMatrixComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PerformanceMatrixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
