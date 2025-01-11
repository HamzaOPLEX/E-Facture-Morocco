import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditBillingFormComponent } from './edit-billing-form.component';

describe('EditBillingFormComponent', () => {
  let component: EditBillingFormComponent;
  let fixture: ComponentFixture<EditBillingFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditBillingFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditBillingFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
