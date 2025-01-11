import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateBillingFormComponent } from './create-billing-form.component';

describe('CreateBillingFormComponent', () => {
  let component: CreateBillingFormComponent;
  let fixture: ComponentFixture<CreateBillingFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateBillingFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateBillingFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
