import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadConsoleComponent } from './upload-console.component';

describe('UploadConsoleComponent', () => {
  let component: UploadConsoleComponent;
  let fixture: ComponentFixture<UploadConsoleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadConsoleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadConsoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
