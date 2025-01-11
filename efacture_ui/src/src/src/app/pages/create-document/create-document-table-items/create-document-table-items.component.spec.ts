import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateDocumentTableItemsComponent } from './create-document-table-items.component';

describe('CreateDocumentTableItemsComponent', () => {
  let component: CreateDocumentTableItemsComponent;
  let fixture: ComponentFixture<CreateDocumentTableItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateDocumentTableItemsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateDocumentTableItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
