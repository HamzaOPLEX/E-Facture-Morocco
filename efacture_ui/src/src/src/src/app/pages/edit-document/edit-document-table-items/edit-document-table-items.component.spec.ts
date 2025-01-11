import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDocumentTableItemsComponent } from './edit-document-table-items.component';

describe('EditDocumentTableItemsComponent', () => {
  let component: EditDocumentTableItemsComponent;
  let fixture: ComponentFixture<EditDocumentTableItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditDocumentTableItemsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditDocumentTableItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
