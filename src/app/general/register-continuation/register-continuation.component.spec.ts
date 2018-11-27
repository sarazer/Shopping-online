import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterContinuationComponent } from './register-continuation.component';

describe('RegisterContinuationComponent', () => {
  let component: RegisterContinuationComponent;
  let fixture: ComponentFixture<RegisterContinuationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterContinuationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterContinuationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
