import { TestBed } from '@angular/core/testing';

import { FetchDocService } from './fetch-doc.service';

describe('FetchDocService', () => {
  let service: FetchDocService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FetchDocService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
