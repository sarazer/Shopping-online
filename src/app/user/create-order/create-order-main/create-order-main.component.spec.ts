import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateOrderMainComponent } from './create-order-main.component';

describe('CreateOrderMainComponent', () => {
  let component: CreateOrderMainComponent;
  let fixture: ComponentFixture<CreateOrderMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateOrderMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateOrderMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
