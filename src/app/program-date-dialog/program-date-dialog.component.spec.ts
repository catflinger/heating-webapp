import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramDateDialogComponent } from './program-date-dialog.component';

describe('ProgramDateDialogComponent', () => {
  let component: ProgramDateDialogComponent;
  let fixture: ComponentFixture<ProgramDateDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProgramDateDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgramDateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
