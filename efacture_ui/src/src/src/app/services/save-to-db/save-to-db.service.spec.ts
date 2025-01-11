import { TestBed } from '@angular/core/testing';

import { SaveToDbService } from './save-to-db.service';

describe('SaveToDbService', () => {
  let service: SaveToDbService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SaveToDbService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
