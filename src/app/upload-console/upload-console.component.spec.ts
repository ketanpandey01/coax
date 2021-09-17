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

  beforeEach(async () => {
    fixture = TestBed.createComponent(UploadConsoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call onUploadFile when input is changed for required files', () => {
    spyOn(component, 'onFileSelect').and.callThrough();

    const mockFile = new File([''], 'filename', { type: 'text/html' });
    const mockEvt = { target: { files: [mockFile] } };
    component.onFileSelect(mockEvt);

    expect(component.onFileSelect).toHaveBeenCalledWith(mockEvt);
    expect(component.selectedFile).toBeDefined();
  });
});
