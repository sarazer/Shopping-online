import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminInsertProductsComponent } from './admin-insert-products.component';

describe('AdminInsertProductsComponent', () => {
  let component: AdminInsertProductsComponent;
  let fixture: ComponentFixture<AdminInsertProductsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminInsertProductsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminInsertProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
