import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocummentsListingComponent } from './documments-listing.component';

describe('DocummentsListingComponent', () => {
  let component: DocummentsListingComponent;
  let fixture: ComponentFixture<DocummentsListingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocummentsListingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocummentsListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
