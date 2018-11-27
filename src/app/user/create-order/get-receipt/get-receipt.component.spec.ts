import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GetReceiptComponent } from './get-receipt.component';

describe('GetReceiptComponent', () => {
  let component: GetReceiptComponent;
  let fixture: ComponentFixture<GetReceiptComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GetReceiptComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GetReceiptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
