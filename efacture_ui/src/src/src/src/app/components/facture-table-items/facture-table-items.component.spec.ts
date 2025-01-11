import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FactureTableItemsComponent } from './facture-table-items.component';

describe('FactureTableItemsComponent', () => {
  let component: FactureTableItemsComponent;
  let fixture: ComponentFixture<FactureTableItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FactureTableItemsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FactureTableItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
