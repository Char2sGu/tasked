import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTaskIllustrationComponent } from './add-task-illustration.component';

describe('AddTaskIllustrationComponent', () => {
  let component: AddTaskIllustrationComponent;
  let fixture: ComponentFixture<AddTaskIllustrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddTaskIllustrationComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTaskIllustrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
